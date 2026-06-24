import mtLogo from "../assets/MT-Logo.png";

export function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-faint px-5 md:px-10 pt-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img
                src={mtLogo}
                alt="Madras Tekkerz Football Academy"
                className="w-12 h-12 object-contain drop-shadow-md"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display tracking-widest text-white text-base">MADRAS TEKKERZ</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-soft">Football Academy</span>
              </div>
            </div>
            <p className="mt-5 text-sm text-soft leading-relaxed max-w-sm">
              Football is our passion, Madras is our emotion. Chennai's premier football academy and arena.
            </p>
            <div className="mt-6 flex gap-3 items-center">
              <a href="https://www.instagram.com/madrastekkerzofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-square">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="social-square" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="social-square" aria-label="X/Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9.03 9.03 0 0 1-2.88 1.1A4.52 4.52 0 0 0 11 4.9v.56A12.94 12.94 0 0 1 3.16 2.56a4.5 4.5 0 0 0-.61 2.28A4.5 4.5 0 0 0 5.1 9.3a4.48 4.48 0 0 1-2.05-.57v.06a4.52 4.52 0 0 0 3.62 4.43A4.52 4.52 0 0 1 3 13.35a4.52 4.52 0 0 0 4.23 3.14A9.05 9.05 0 0 1 1 18.58a12.78 12.78 0 0 0 6.92 2.03c8.3 0 12.84-7 12.84-13.07 0-.2 0-.39-.02-.58A9.22 9.22 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="social-square" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.4a2.78 2.78 0 0 0-1.95 2A29.4 29.4 0 0 0 1 12a29.4 29.4 0 0 0 .47 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29.4 29.4 0 0 0 23 12a29.4 29.4 0 0 0-.46-5.58z"></path><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          {[
            { title: "Academy", items: ["About Us", "Our Teams", "Coaching Staff", "Trials"] },
            { title: "Football", items: ["Fixtures", "Results", "News & Media", "Tournaments"] },
            { title: "Visit", items: ["Venue Hire", "Contact", "Directions", "Careers"] },
          ].map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-[11px] tracking-[0.3em] uppercase text-white font-semibold mb-5">{col.title}</div>
              <ul className="space-y-3 text-sm text-soft">
                {col.items.map((i) => (
                  <li key={i}><a href="#" className="hover:text-white transition-colors">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <div className="text-[11px] tracking-[0.3em] uppercase text-white font-semibold mb-5">Reach</div>
            <ul className="space-y-3 text-sm text-soft">
              <li>+91 90000 12345</li>
              <li>play@madrastekkerz.com</li>
              <li>OMR, Sholinganallur</li>
              <li>Chennai 600119</li>
            </ul>
          </div>
        </div>

        {/* Divider above watermark */}
        <div className="mt-14 border-t border-faint" />
      </div>

      {/* MADRAS TEKKERZ — outline only, no fill, flows below footer content */}
      <div aria-hidden="true" style={{ lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>
        <svg
          viewBox="0 0 1300 160"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        >
          <text
            x="650"
            y="145"
            textAnchor="middle"
            dominantBaseline="auto"
            fontFamily="'Anton', Impact, sans-serif"
            fontWeight="900"
            fontSize="145"
            letterSpacing="8"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          >
            MADRAS TEKKERZ
          </text>
        </svg>
      </div>

      {/* Copyright row — below the watermark */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="pt-4 pb-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-w">
          <div>© {new Date().getFullYear()} Madras Tekkerz Football Academy. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
