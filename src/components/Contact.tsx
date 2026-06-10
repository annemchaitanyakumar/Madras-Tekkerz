import { useState } from "react";
import { Reveal } from "./Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 px-5 md:px-10 bg-navy-dark overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5" variant="fade-right">
          <span className="text-[11px] tracking-[0.3em] uppercase text-gold font-semibold">Reach Us</span>
          <h2 className="font-display text-white text-4xl md:text-5xl tracking-wide mt-4 leading-[1.05]">
            COME PLAY WITH US.
          </h2>
          <p className="mt-5 text-soft">
            Have a question about trials, tournaments or hiring the venue? Send us a note and we'll get
            back within 24 hours.
          </p>

          <dl className="mt-10 space-y-6">
            {[
              { k: "Address", v: "4, 123A, Sunnambu Kolathur Main Rd, Rajam Nagar, Kovilambakkam, Chennai, Tamil Nadu 600129" },
              { k: "Phone", v: "+91 94446 43197" },
              { k: "Email", v: "play@madrastekkerz.com" },
              { k: "Hours", v: "Open 24 hours" },
            ].map((row) => (
              <div key={row.k} className="grid grid-cols-12 gap-4 border-b border-faint pb-4">
                <dt className="col-span-4 text-[11px] tracking-[0.25em] uppercase text-muted-w">{row.k}</dt>
                <dd className="col-span-8 text-white text-sm md:text-base">{row.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-7" variant="fade-left" delay={150}>
          <form onSubmit={submit} className="rounded-xl border border-faint bg-navy p-6 md:p-10">
            <h3 className="font-display text-white text-2xl md:text-3xl tracking-wide">SEND US A MESSAGE</h3>
            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <label className="block">
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-w block mb-2">Name</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field" placeholder="Your full name" />
              </label>
              <label className="block">
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-w block mb-2">Phone</span>
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="field" placeholder="+91 9XXXX XXXXX" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-w block mb-2">Email</span>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field" placeholder="you@email.com" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-[11px] tracking-[0.2em] uppercase text-muted-w block mb-2">Message</span>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="field resize-none" placeholder="Tell us about your enquiry — trials, venue hire, tournaments..." />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6">
              {sent ? "Message Sent ✓" : "Send Message"} <span aria-hidden>→</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
