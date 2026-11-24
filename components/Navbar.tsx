export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-nav border-b border-slate-200/60 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
          <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm tracking-tight">Cynbit</span>
              <span className="text-indigo-600 font-black text-sm"> Technologies</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-500">
            <a href="https://www.cynbit.in/services" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Services</a>
            <a href="https://www.cynbit.in/products" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="https://www.cynbit.in/case-studies" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Case Studies</a>
            <a href="https://www.cynbit.in/bitelevate" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">BitElevate</a>
          </div>

          <a href="https://www.cynbit.in/contact" target="_blank" rel="noopener noreferrer">
            <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
              Contact Us
            </button>
          </a>
        </div>
      </nav>
    </header>
  );
}
