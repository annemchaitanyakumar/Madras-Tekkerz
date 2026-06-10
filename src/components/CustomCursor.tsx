import { useEffect } from "react";

// ─── 3D Vector Math ──────────────────────────────────────────────────────────
type V3 = [number, number, number];

const norm  = ([x,y,z]: V3): V3 => { const l = Math.sqrt(x*x+y*y+z*z); return [x/l,y/l,z/l]; };
const cross = ([ax,ay,az]: V3, [bx,by,bz]: V3): V3 => [ay*bz-az*by, az*bx-ax*bz, ax*by-ay*bx];
const dot   = ([ax,ay,az]: V3, [bx,by,bz]: V3) => ax*bx + ay*by + az*bz;
const scale = ([x,y,z]: V3, s: number): V3 => [x*s, y*s, z*s];
const add   = ([ax,ay,az]: V3, [bx,by,bz]: V3): V3 => [ax+bx, ay+by, az+bz];

// Rodrigues' rotation formula — rotate v around axis k by angle θ
function rotateAround(v: V3, k: V3, theta: number): V3 {
  const cosT = Math.cos(theta), sinT = Math.sin(theta);
  const kn   = norm(k);
  return add(add(scale(v, cosT), scale(cross(kn, v), sinT)), scale(kn, dot(kn, v) * (1 - cosT)));
}

// ─── Football Geometry ────────────────────────────────────────────────────────
// Icosahedron vertices (12 pentagon centres of a truncated icosahedron)
const PHI = (1 + Math.sqrt(5)) / 2;
const PENTAGON_CENTRES: V3[] = [
  [0, 1, PHI], [0,-1, PHI], [0, 1,-PHI], [0,-1,-PHI],
  [1, PHI, 0], [-1, PHI, 0], [1,-PHI, 0], [-1,-PHI, 0],
  [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0,-1], [-PHI, 0,-1],
].map(v => norm(v as V3));

// Build pentagon vertex ring on the sphere around a centre point
function pentagonRing(centre: V3, angRadius: number): V3[] {
  const up: V3 = Math.abs(centre[1]) < 0.9 ? [0,1,0] : [1,0,0];
  const u  = norm(cross(up, centre));
  const v  = cross(centre, u);
  const cosR = Math.cos(angRadius), sinR = Math.sin(angRadius);
  return Array.from({ length: 5 }, (_, i) => {
    const a = (i * 2 * Math.PI / 5) - Math.PI / 2;
    const cos = Math.cos(a), sin = Math.sin(a);
    return norm([
      cosR * centre[0] + sinR * (cos * u[0] + sin * v[0]),
      cosR * centre[1] + sinR * (cos * u[1] + sin * v[1]),
      cosR * centre[2] + sinR * (cos * u[2] + sin * v[2]),
    ]);
  });
}

// Pre-compute pentagon rings (angular radius ≈ 0.37 rad gives nice gap for seams)
const PENTAGON_RINGS = PENTAGON_CENTRES.map(c => pentagonRing(c, 0.37));

// ─── Component ────────────────────────────────────────────────────────────────
export function CustomCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;

    // ── Canvas setup (2× DPR for crisp rendering) ──────────────────────────
    const DPR  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 28;                   // CSS pixels
    const PX   = Math.round(SIZE * DPR); // physical pixels

    const canvas = document.createElement("canvas");
    canvas.width  = PX;
    canvas.height = PX;
    canvas.style.cssText = `display:block;width:${SIZE}px;height:${SIZE}px;`;

    const root = document.createElement("div");
    root.id = "fc-root";
    root.style.cssText = `
      position:fixed; top:0; left:0;
      width:${SIZE}px; height:${SIZE}px;
      pointer-events:none;
      z-index:2147483647;
      isolation:isolate;
      transform:translate3d(-300px,-300px,0);
      margin-top:-${SIZE/2}px;
      margin-left:-${SIZE/2}px;
      will-change:transform;
      filter:drop-shadow(0 4px 12px rgba(0,0,0,0.55));
      transition:filter .25s ease, width .2s ease, height .2s ease,
                 margin-top .2s ease, margin-left .2s ease;
    `;
    root.appendChild(canvas);
    document.body.appendChild(root);

    // ── Hide native cursor ─────────────────────────────────────────────────
    const styleEl = document.createElement("style");
    styleEl.id = "fc-hide";
    styleEl.textContent = `@media(hover:hover) and (pointer:fine){*,*::before,*::after{cursor:none!important;}}`;
    if (!document.getElementById("fc-hide")) document.head.appendChild(styleEl);

    const ctx = canvas.getContext("2d")!;
    const R  = (PX / 2) * 0.88;       // sphere radius in physical px
    const CX = PX / 2;
    const CY = PX / 2;

    // ── Rotation state (quaternion-like axis + angles) ─────────────────────
    let axisX: V3 = [1, 0, 0];        // current spin axis X
    let axisY: V3 = [0, 1, 0];        // current spin axis Y
    // Rotation is stored as cumulative rotations around world X/Y
    let rotX = 0.4, rotY = 0.2;

    // Angular velocity vector [wx, wy] — in radians/frame
    let angVX = 0.003;
    let angVY = 0.006;

    // ── Mouse / position state ─────────────────────────────────────────────
    let mouseX = -300, mouseY = -300;
    let curX   = -300, curY   = -300;
    let prevX  = -300, prevY  = -300;
    let isHovered = false;
    let raf: number;

    // ── Pre-build sphere gradient (cached) ────────────────────────────────
    const buildSphereGrad = () => {
      // Light source at upper-left → brighter there, dark at lower-right
      const g = ctx.createRadialGradient(
        CX - R * 0.3, CY - R * 0.35, R * 0.01,
        CX + R * 0.05, CY + R * 0.1, R * 1.02
      );
      g.addColorStop(0.00, '#f8f8f8');
      g.addColorStop(0.18, '#e4e4e4');
      g.addColorStop(0.42, '#c0c0c0');
      g.addColorStop(0.65, '#888888');
      g.addColorStop(0.85, '#484848');
      g.addColorStop(1.00, '#1a1a1a');
      return g;
    };

    // ── Rotate a 3D point by current rotX, rotY ───────────────────────────
    const applyRot = (p: V3): V3 => {
      let v = rotateAround(p, [1, 0, 0], rotX);
          v = rotateAround(v, [0, 1, 0], rotY);
      return v;
    };

    // ── Project 3D point on unit sphere → canvas 2D coords ───────────────
    const proj = ([x, y, z]: V3) => ({
      px: CX + x * R,
      py: CY - y * R,   // flip Y (canvas Y grows down)
      depth: z,         // +1 = facing camera, -1 = away
    });

    // ── Draw one frame ────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, PX, PX);

      // ── Base sphere ──────────────────────────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, R, 0, Math.PI * 2);
      ctx.clip();

      ctx.fillStyle = buildSphereGrad();
      ctx.fillRect(0, 0, PX, PX);

      // ── Football patches ─────────────────────────────────────────────
      // Collect all patches with depth for painter's sort
      type PatchInfo = { verts: Array<{px:number,py:number}>, depth: number, z: number };
      const patches: PatchInfo[] = [];

      for (let i = 0; i < PENTAGON_CENTRES.length; i++) {
        const centre3D = applyRot(PENTAGON_CENTRES[i]);
        if (centre3D[2] < -0.15) continue; // rough back-face cull on centre

        const ring3D  = PENTAGON_RINGS[i].map(applyRot);
        const projected = ring3D.map(proj);

        // Average z of all 5 verts for sorting
        const avgZ = ring3D.reduce((s, v) => s + v[2], 0) / 5;

        patches.push({ verts: projected, depth: avgZ, z: centre3D[2] });
      }

      // Sort back-to-front (painter's algorithm)
      patches.sort((a, b) => a.depth - b.depth);

      for (const { verts, z } of patches) {
        // Depth-based patch appearance:
        // At z=1 (front): fully black, high contrast
        // At z=0 (equator edge): dark grey, lower contrast
        const t = Math.max(0, z);  // 0…1
        const bri = Math.round(10 + (1 - t) * 30); // 10 at front, 40 at edge
        const alpha = 0.55 + t * 0.4;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(verts[0].px, verts[0].py);
        for (let k = 1; k < verts.length; k++) ctx.lineTo(verts[k].px, verts[k].py);
        ctx.closePath();

        ctx.fillStyle   = `rgb(${bri},${bri},${bri})`;
        ctx.strokeStyle = `rgba(${bri+35},${bri+35},${bri+35},0.5)`;
        ctx.lineWidth   = 0.6 * DPR;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // ── Specular highlight (stays fixed — pure light reflection) ─────
      const spec = ctx.createRadialGradient(
        CX - R * 0.28, CY - R * 0.32, 0,
        CX - R * 0.05, CY - R * 0.05, R * 0.62
      );
      spec.addColorStop(0.00, 'rgba(255,255,255,0.96)');
      spec.addColorStop(0.18, 'rgba(255,255,255,0.72)');
      spec.addColorStop(0.45, 'rgba(255,255,255,0.25)');
      spec.addColorStop(0.75, 'rgba(255,255,255,0.06)');
      spec.addColorStop(1.00, 'rgba(255,255,255,0)');
      ctx.fillStyle = spec;
      ctx.fillRect(0, 0, PX, PX);

      // ── Secondary soft bounce light (lower right — subtle fill) ──────
      const fill = ctx.createRadialGradient(
        CX + R * 0.5, CY + R * 0.45, 0,
        CX + R * 0.3, CY + R * 0.3, R * 0.55
      );
      fill.addColorStop(0,   'rgba(255,255,255,0.09)');
      fill.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = fill;
      ctx.fillRect(0, 0, PX, PX);

      ctx.restore(); // end sphere clip

      // ── Rim stroke ───────────────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(CX, CY, R - 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.7)';
      ctx.lineWidth   = 1.2 * DPR;
      ctx.stroke();
    };

    // ── Main animation loop ───────────────────────────────────────────────
    const loop = () => {
      // Lerp cursor position
      curX += (mouseX - curX) * 0.13;
      curY += (mouseY - curY) * 0.13;
      root.style.transform = `translate3d(${curX}px,${curY}px,0)`;

      // Cursor velocity
      const vx = mouseX - prevX;
      const vy = mouseY - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);

      // Inject velocity into angular velocity
      // Moving right → rotates around world Y (positive angVY)
      // Moving down  → rotates around world X (positive angVX)
      if (speed > 0.2) {
        angVX += vy * 0.00090;
        angVY += vx * 0.00090;
      }

      // Damping — ball gradually coasts to a slow idle spin
      angVX *= 0.92;
      angVY *= 0.92;

      // Idle minimum rotation so the ball always looks alive
      const IDLE = 0.0025;
      if (Math.abs(angVX) < IDLE * 0.3) angVX += IDLE * 0.2;
      if (Math.abs(angVY) < IDLE)       angVY += IDLE;

      // Clamp max spin speed
      const MAX_SPIN = 0.18;
      angVX = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, angVX));
      angVY = Math.max(-MAX_SPIN, Math.min(MAX_SPIN, angVY));

      // Apply rotation
      rotX += angVX;
      rotY += angVY;

      prevX = mouseX;
      prevY = mouseY;

      draw();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    // ── Event listeners ───────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    const onDown = () => { root.style.scale = '0.78'; };
    const onUp   = () => { root.style.scale = '1'; };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit = !!t?.closest?.("a,button,[role='button'],input,textarea,select,label");
      if (hit === isHovered) return;
      isHovered = hit;
      if (hit) {
        root.style.width  = `${SIZE + 12}px`;
        root.style.height = `${SIZE + 12}px`;
        root.style.marginTop  = `-${(SIZE + 12) / 2}px`;
        root.style.marginLeft = `-${(SIZE + 12) / 2}px`;
        root.style.filter = `drop-shadow(0 0 14px rgba(245,168,0,0.75)) drop-shadow(0 4px 14px rgba(0,0,0,0.6))`;
        canvas.style.width  = `${SIZE + 12}px`;
        canvas.style.height = `${SIZE + 12}px`;
        // Kick spin faster on hover
        angVY += 0.05;
      } else {
        root.style.width  = `${SIZE}px`;
        root.style.height = `${SIZE}px`;
        root.style.marginTop  = `-${SIZE / 2}px`;
        root.style.marginLeft = `-${SIZE / 2}px`;
        root.style.filter = `drop-shadow(0 4px 12px rgba(0,0,0,0.55))`;
        canvas.style.width  = `${SIZE}px`;
        canvas.style.height = `${SIZE}px`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup",   onUp,   { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("mouseover", onOver);
      root.remove();
      document.getElementById("fc-hide")?.remove();
    };
  }, []);

  return null;
}
