export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">C</span>
              </div>
              <span className="font-black text-lg">Cynbit Technologies</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Architecting the digital future with autonomous AI agents, custom software development,
              and scalable business platforms.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">About This Prototype</div>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>Built with Next.js 15 + TypeScript</li>
              <li>Styled with Tailwind CSS v4</li>
              <li>Matches Cynbit&apos;s design system exactly</li>
              <li>Deployed on Vercel</li>
              <li>Open source on GitHub</li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">Links</div>
            <ul className="space-y-3">
              {[
                ["Cynbit Website", "https://www.cynbit.in"],
                ["Services", "https://www.cynbit.in/services"],
                ["Case Studies", "https://www.cynbit.in/case-studies"],
                ["BitElevate", "https://www.cynbit.in/bitelevate"],
                ["Contact Cynbit", "https://www.cynbit.in/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-indigo-400 transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    {label}
                    <span className="material-symbols-outlined text-xs opacity-0 group-hover:opacity-100 transition-opacity">north_east</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © 2026 Cynbit Technologies · Prototype by assessment candidate
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
            <span>Jaipur, Rajasthan, India</span>
            <a href="mailto:opportunities@cynbit.in" className="hover:text-indigo-400 transition-colors">
              opportunities@cynbit.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
