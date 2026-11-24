export default function FeatureHighlights() {
  const features = [
    {
      icon: "psychology",
      color: "indigo",
      title: "Intelligent Lead Qualification",
      description:
        "The assistant dynamically scores leads based on project type, budget, timeline, and urgency — routing high-value opportunities to the top of the queue.",
    },
    {
      icon: "route",
      color: "violet",
      title: "Service Recommendation Engine",
      description:
        "Based on answers, the assistant maps the visitor to the right Cynbit service (AI Automation, Full-Stack Dev, Cloud, Marketing) and shows relevant case studies.",
    },
    {
      icon: "description",
      color: "emerald",
      title: "Instant Project Brief",
      description:
        "At the end of the flow, a structured project brief is generated and shown to the user — giving them immediate value and priming Cynbit's team for a productive first call.",
    },
    {
      icon: "bar_chart",
      color: "amber",
      title: "Analytics & Conversion Tracking",
      description:
        "Every step, drop-off, and completion is trackable via Google Analytics events — letting Cynbit optimize the funnel and understand user intent patterns.",
    },
  ];

  const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
    indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100" },
    violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100" },
    emerald: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "border-emerald-100" },
    amber: { bg: "bg-amber-50", icon: "text-amber-600", border: "border-amber-100" },
  };

  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Why This Matters
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6 leading-tight">
            What this prototype delivers.
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Moving from a static 5-field form to an intelligent intake assistant has measurable impact
            on lead quality, conversion rates, and sales efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const c = colorMap[f.color];
            return (
              <div
                key={i}
                className={`p-8 rounded-3xl border ${c.border} ${c.bg} hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm flex-shrink-0`}>
                    <span className={`material-symbols-outlined ${c.icon} text-2xl`}>{f.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{f.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-medium text-sm">{f.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-3 text-center">
            <div className="p-6 border-b border-slate-100">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Feature</div>
            </div>
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">Current Form</div>
            </div>
            <div className="p-6 border-b border-indigo-50 bg-indigo-50">
              <div className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">This Prototype</div>
            </div>
          </div>
          {[
            ["Lead Qualification", "❌ Manual", "✅ Automatic"],
            ["Service Routing", "❌ None", "✅ AI-matched"],
            ["Instant User Value", "❌ Wait for email", "✅ Brief shown immediately"],
            ["Conversion Rate", "~2–3% (industry avg)", "Est. 4–6%+ (guided flow)"],
            ["Time to Qualify", "24–48 hrs (manual)", "0 seconds (automated)"],
            ["User Drop-off Point", "Blank form = paralysis", "Guided steps = completion"],
          ].map(([feature, current, improved], i) => (
            <div key={i} className="grid grid-cols-3 text-center border-b border-slate-100 last:border-0">
              <div className="p-5 text-left">
                <span className="text-sm font-bold text-slate-700">{feature}</span>
              </div>
              <div className="p-5 bg-slate-50">
                <span className="text-sm text-slate-500">{current}</span>
              </div>
              <div className="p-5 bg-indigo-50/50">
                <span className="text-sm font-bold text-indigo-700">{improved}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
