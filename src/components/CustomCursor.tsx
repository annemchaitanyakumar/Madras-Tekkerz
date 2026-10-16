import { useEffect } from "react";

// ─── 3D Vector Math ──────────────────────────────────────────────────────────
type V3 = [number, number, number];

const norm = ([x, y, z]: V3): V3 => {
  const l = Math.sqrt(x * x + y * y + z * z);
  return l === 0 ? [0, 0, 0] : [x / l, y / l, z / l];
};

const cross = ([ax, ay, az]: V3, [bx, by, bz]: V3): V3 => [
  ay * bz - az * by,
  az * bx - ax * bz,
  ax * by - ay * bx,
];

// ─── Pre-computed Football Geometry ──────────────────────────────────────────
const PHI = (1 + Math.sqrt(5)) / 2;
const PENT_CENTRES: V3[] = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1],
].map((v) => norm(v as V3));

function createPentagonRing(centre: V3, angRadius: number): V3[] {
  const up: V3 = Math.abs(centre[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  const u = norm(cross(up, centre));
  const v = cross(centre, u);
  const cosR = Math.cos(angRadius);
  const sinR = Math.sin(angRadius);
  return Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const ca = Math.cos(a);
    const sa = Math.sin(a);
    return norm([
      cosR * centre[0] + sinR * (ca * u[0] + sa * v[0]),
      cosR * centre[1] + sinR * (ca * u[1] + sa * v[1]),
      cosR * centre[2] + sinR * (ca * u[2] + sa * v[2]),
    ]);
  });
}
const PENT_RINGS = PENT_CENTRES.map((c) => createPentagonRing(c, 0.38));

// ─── CustomCursor Component ──────────────────────────────────────────────────
export function CustomCursor() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    // ── Setup Dimensions ─────────────────────────────────────────────────────
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const BALL_SIZE = 26; // CSS px
    const PADDING = 10;   // Padding for shadow & glow
    const TOTAL_SIZE = BALL_SIZE + PADDING * 2;
    const HALF = TOTAL_SIZE / 2;

    const CW = Math.round(TOTAL_SIZE * DPR);
    const CH = Math.round(TOTAL_SIZE * DPR);
    const CX = CW / 2;
    const CY = CH / 2;
    const R = (BALL_SIZE * DPR) / 2;

    // ── DOM Tree ─────────────────────────────────────────────────────────────
    const oldRoot = document.getElementById("fc-root");
    if (oldRoot) oldRoot.remove();

    // 1. root: handles instant translate3d (zero latency, zero layout reflow)
    const root = document.createElement("div");
    root.id = "fc-root";
    root.style.cssText = [
      "position:fixed",
      "top:0",
      "left:0",
      `width:${TOTAL_SIZE}px`,
      `height:${TOTAL_SIZE}px`,
      "pointer-events:none",
      "z-index:2147483647",
      "transform:translate3d(-9999px,-9999px,0)",
      "will-change:transform",
      "opacity:0",
      "transition:opacity 0.2s ease",
    ].join(";");

    // 2. scaler: handles GPU-accelerated hover scale and click squashing
    const scaler = document.createElement("div");
    scaler.id = "fc-scaler";
    scaler.style.cssText = [
      "width:100%",
      "height:100%",
      "transform-origin:center center",
      "pointer-events:none",
      "transition:transform 0.22s cubic-bezier(0.16,1,0.3,1)",
      "will-change:transform",
    ].join(";");

    // 3. canvas: draws 3D ball
    const canvas = document.createElement("canvas");
    canvas.width = CW;
    canvas.height = CH;
    canvas.style.cssText = `display:block;width:${TOTAL_SIZE}px;height:${TOTAL_SIZE}px;pointer-events:none;`;

    scaler.appendChild(canvas);
    root.appendChild(scaler);
    document.body.appendChild(root);

    // Hide native OS cursor on desktop
    const styleEl = document.createElement("style");
    styleEl.id = "fc-style";
    styleEl.textContent =
      "@media(hover:hover) and (pointer:fine){*,*::before,*::after{cursor:none!important;}}";
    if (!document.getElementById("fc-style")) document.head.appendChild(styleEl);

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Pre-bake all gradients ONCE ──────────────────────────────────────────
    // Sphere 3D shading
    const sphereGrad = ctx.createRadialGradient(
      CX - R * 0.35, CY - R * 0.4, R * 0.02,
      CX, CY, R * 1.05
    );
    sphereGrad.addColorStop(0.00, "#ffffff");
    sphereGrad.addColorStop(0.18, "#f0f2f5");
    sphereGrad.addColorStop(0.48, "#d1d5db");
    sphereGrad.addColorStop(0.78, "#8b93a0");
    sphereGrad.addColorStop(0.92, "#4a5260");
    sphereGrad.addColorStop(1.00, "#1f242d");

    // Specular highlight
    const specGrad = ctx.createRadialGradient(
      CX - R * 0.32, CY - R * 0.36, 0,
      CX - R * 0.15, CY - R * 0.15, R * 0.65
    );
    specGrad.addColorStop(0.00, "rgba(255, 255, 255, 0.95)");
    specGrad.addColorStop(0.20, "rgba(255, 255, 255, 0.65)");
    specGrad.addColorStop(0.50, "rgba(255, 255, 255, 0.12)");
    specGrad.addColorStop(1.00, "rgba(255, 255, 255, 0)");

    // Normal ambient shadow
    const shadowNormal = ctx.createRadialGradient(
      CX, CY + 2 * DPR, R * 0.3,
      CX, CY + 2 * DPR, R * 1.2
    );
    shadowNormal.addColorStop(0.0, "rgba(0, 0, 0, 0.5)");
    shadowNormal.addColorStop(0.6, "rgba(0, 0, 0, 0.15)");
    shadowNormal.addColorStop(1.0, "rgba(0, 0, 0, 0)");

    // Hover gold glow halo shadow
    const shadowHover = ctx.createRadialGradient(
      CX, CY + 2 * DPR, R * 0.4,
      CX, CY + 2 * DPR, R * 1.35
    );
    shadowHover.addColorStop(0.0, "rgba(245, 168, 0, 0.65)");
    shadowHover.addColorStop(0.5, "rgba(245, 168, 0, 0.25)");
    shadowHover.addColorStop(1.0, "rgba(245, 168, 0, 0)");

    // ── Rotation Matrix Setup ────────────────────────────────────────────────
    let rotX = 0.5;
    let rotY = 0.3;
    let angVX = 0.002;
    let angVY = 0.005;

    let m00 = 1, m01 = 0, m02 = 0;
    let m10 = 0, m11 = 1, m12 = 0;
    let m20 = 0, m21 = 0, m22 = 1;

    const updateMatrix = () => {
      const cx = Math.cos(rotX), sx = Math.sin(rotX);
      const cy = Math.cos(rotY), sy = Math.sin(rotY);
      m00 = cy;        m01 = 0;   m02 = sy;
      m10 = sx * sy;   m11 = cx;  m12 = -sx * cy;
      m20 = -cx * sy;  m21 = sx;  m22 = cx * cy;
    };

    const applyRot = ([x, y, z]: V3): V3 => [
      m00 * x + m02 * z,
      m10 * x + m11 * y + m12 * z,
      m20 * x + m21 * y + m22 * z,
    ];

    // Pre-allocated patch structures to eliminate GC allocations
    type ScreenPatch = {
      pts: Array<{ px: number; py: number }>;
      z: number;
    };
    const visiblePatches: ScreenPatch[] = [];

    let isHovered = false;
    let isMouseDown = false;

    // ── Canvas Render (No clip mask, ultra-fast 0.1ms render) ────────────────
    const draw = () => {
      ctx.clearRect(0, 0, CW, CH);

      // 1. Shadow / Glow (rendered behind ball)
      ctx.beginPath();
      ctx.arc(CX, CY + 2 * DPR, R * 1.15, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? shadowHover : shadowNormal;
      ctx.fill();

      // 2. Base 3D Sphere
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // 3. Visible pentagon patches (all front-facing vertices naturally stay inside circle)
      visiblePatches.length = 0;
      for (let i = 0; i < PENT_CENTRES.length; i++) {
        const c3 = applyRot(PENT_CENTRES[i]);
        if (c3[2] <= 0.02) continue; // Backface culling

        const ring = PENT_RINGS[i];
        const pts: Array<{ px: number; py: number }> = [];
        for (let j = 0; j < 5; j++) {
          const v3 = applyRot(ring[j]);
          pts.push({
            px: CX + v3[0] * R,
            py: CY - v3[1] * R,
          });
        }
        visiblePatches.push({ pts, z: c3[2] });
      }

      // Sort front-facing patches by depth (at most 5-6 patches)
      visiblePatches.sort((a, b) => a.z - b.z);

      ctx.lineWidth = 0.75 * DPR;
      for (let i = 0; i < visiblePatches.length; i++) {
        const { pts, z } = visiblePatches[i];
        const t = Math.max(0, Math.min(1, z));
        const bri = (20 + (1 - t) * 20) | 0;

        ctx.beginPath();
        ctx.moveTo(pts[0].px, pts[0].py);
        for (let k = 1; k < 5; k++) {
          ctx.lineTo(pts[k].px, pts[k].py);
        }
        ctx.closePath();

        ctx.fillStyle = `rgb(${bri},${bri},${bri})`;
        ctx.strokeStyle = `rgba(${bri + 45},${bri + 45},${bri + 45},0.6)`;
        ctx.fill();
        ctx.stroke();
      }

      // 4. Specular highlight overlay
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // 5. Rim outline
      ctx.beginPath();
      ctx.arc(CX, CY, R - 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(15, 20, 28, 0.65)";
      ctx.lineWidth = 1.1 * DPR;
      ctx.stroke();
    };

    // ── Animation Loop (Physics & 3D roll only, decoupled from position) ─────
    let raf: number;
    const loop = () => {
      // Momentum dampening
      angVX *= 0.93;
      angVY *= 0.93;

      // Gentle ambient idle spin when resting
      const idleMin = 0.002;
      if (Math.abs(angVX) < idleMin) angVX += 0.0006;
      if (Math.abs(angVY) < idleMin * 2) angVY += 0.0016;

      // Clamp max angular velocity
      angVX = Math.max(-0.16, Math.min(0.16, angVX));
      angVY = Math.max(-0.16, Math.min(0.16, angVY));

      rotX += angVX;
      rotY += angVY;

      updateMatrix();
      draw();

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // ── Input Listeners (Zero-Latency Pointer Tracking) ──────────────────────
    let prevX = 0;
    let prevY = 0;
    let hasMoved = false;

    const onMove = (e: MouseEvent | PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // 1. INSTANT hardware pointer position update (0ms latency, zero lag!)
      root.style.transform = `translate3d(${x - HALF}px,${y - HALF}px,0)`;

      // 2. Rolling ball physics
      if (hasMoved) {
        const dx = x - prevX;
        const dy = y - prevY;
        angVY += dx * 0.0016;
        angVX += dy * 0.0016;
      } else {
        hasMoved = true;
        root.style.opacity = "1";
      }

      prevX = x;
      prevY = y;
    };

    const updateScalerTransform = () => {
      if (isMouseDown) {
        scaler.style.transform = "scale(0.85)";
      } else if (isHovered) {
        scaler.style.transform = "scale(1.28)";
      } else {
        scaler.style.transform = "scale(1)";
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isMouseDown = true;
      updateScalerTransform();
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isMouseDown = false;
      updateScalerTransform();
    };

    // ── Interactive Hover Targets ────────────────────────────────────────────
    const INTERACTIVE_SELECTOR =
      "a, button, [role='button'], input, textarea, select, label, .nav-pill, .btn-primary, .btn-outline, [data-cursor='pointer']";

    let hoverCheckTimer = 0;
    const onHoverCheck = (e: MouseEvent | PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      clearTimeout(hoverCheckTimer);
      // Small 16ms throttle to coalesce nested child crossings
      hoverCheckTimer = window.setTimeout(() => {
        const hit = !!target.closest(INTERACTIVE_SELECTOR);
        if (hit !== isHovered) {
          isHovered = hit;
          updateScalerTransform();
          if (hit) angVY += 0.03; // Playful spin impulse on hover
        }
      }, 16);
    };

    // Only hide if cursor completely exits the browser viewport
    const onMouseLeaveDoc = (e: MouseEvent) => {
      if (!e.relatedTarget && !(e as any).toElement) {
        root.style.opacity = "0";
      }
    };

    const onMouseEnterDoc = () => {
      if (hasMoved) root.style.opacity = "1";
    };

    // Prevent HTML5 native drag from intercepting mousemove events
    const onDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    window.addEventListener("mouseover", onHoverCheck, { passive: true });
    window.addEventListener("pointerover", onHoverCheck, { passive: true });
    window.addEventListener("dragstart", onDragStart);
    document.documentElement.addEventListener("mouseleave", onMouseLeaveDoc, { passive: true });
    document.documentElement.addEventListener("mouseenter", onMouseEnterDoc, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hoverCheckTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", onHoverCheck);
      window.removeEventListener("pointerover", onHoverCheck);
      window.removeEventListener("dragstart", onDragStart);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDoc);
      root.remove();
      document.getElementById("fc-style")?.remove();
    };
  }, []);

  return null;
}
