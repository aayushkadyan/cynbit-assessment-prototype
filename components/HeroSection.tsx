export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-white">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-indigo-50 rounded-full blur-[120px] -mr-[300px] -mt-[300px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-50 rounded-full blur-[100px] -ml-[200px] pointer-events-none" />

      <div className="max-w-screen-xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-green-50 text-green-800 font-bold text-[10px] uppercase tracking-widest shadow-sm border border-green-200 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          Prototype — Smart Project Intake for Cynbit
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-slate-900 mb-6">
          Stop guessing what<br />
          <span className="text-gradient-primary italic">to say</span> in a form.
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Cynbit&apos;s current contact form is a blank slate. This prototype replaces it with an
          intelligent scoping assistant that qualifies your project, recommends the right services,
          and generates a personalized brief — instantly.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-100">
            <span className="material-symbols-outlined text-indigo-600 text-base">psychology</span>
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Smart Qualification</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full border border-violet-100">
            <span className="material-symbols-outlined text-violet-600 text-base">auto_awesome</span>
            <span className="text-xs font-bold text-violet-700 uppercase tracking-wider">Instant Brief Generation</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
            <span className="material-symbols-outlined text-emerald-600 text-base">verified</span>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Cynbit Design System</span>
          </div>
        </div>

        {/* Arrow pointing down */}
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs font-black uppercase tracking-widest">Try it below</span>
          <span className="material-symbols-outlined text-2xl animate-bounce">keyboard_arrow_down</span>
        </div>
      </div>
    </section>
  );
}
