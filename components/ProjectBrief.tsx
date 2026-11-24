"use client";

interface BriefProps {
  data: {
    goal: string; services: string[]; budget: string;
    timeline: string; details: string; name: string;
    email: string; company: string;
  };
  score: { score: number; label: string; color: string };
  recommendations: { title: string; desc: string; link: string; icon: string }[];
}

const goalLabels: Record<string, string> = {
  automate: "AI & Business Automation", build: "Custom Software Development",
  cloud: "Cloud Infrastructure Modernization", grow: "Digital Growth Engineering",
  product: "Cynbit SaaS Products", learn: "BitElevate Engineering Program",
};

const budgetLabels: Record<string, string> = {
  under_50k: "Under ₹50K", "50k_200k": "₹50K – ₹2L",
  "200k_500k": "₹2L – ₹5L", "500k_plus": "₹5L+", not_sure: "To be scoped",
};

const timelineLabels: Record<string, string> = {
  asap: "ASAP — within 2 weeks", "1month": "Within 1 month",
  "3months": "1–3 months", flexible: "Flexible — planning phase",
};

const serviceLabels: Record<string, string> = {
  ai_agents: "AI & Autonomous Agents", fullstack: "Full-Stack Development",
  mobile: "Mobile App", cloud_infra: "Cloud & Infrastructure",
  seo: "Technical SEO", ads: "Performance Ads / CRM",
  data: "Data & Analytics", design: "UI/UX Design",
};

export default function ProjectBrief({ data, score, recommendations }: BriefProps) {
  const colorMap: Record<string, { badge: string; bar: string }> = {
    emerald: { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "bg-emerald-500" },
    amber: { badge: "bg-amber-100 text-amber-700 border-amber-200", bar: "bg-amber-500" },
    blue: { badge: "bg-blue-100 text-blue-700 border-blue-200", bar: "bg-blue-500" },
  };
  const c = colorMap[score.color];

  return (
    <section className="py-24 px-6 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto">

        {/* Success banner */}
        <div className="text-center mb-12 slide-up">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase tracking-widest shadow-sm border border-emerald-200 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Brief Generated Successfully
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
            Your Project Brief<span className="text-indigo-600">.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Here&apos;s what Cynbit&apos;s team will receive. We&apos;ll follow up at{" "}
            <span className="font-bold text-slate-800">{data.email}</span> within 24 hours.
          </p>
        </div>

        {/* Brief card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-6 slide-up">

          {/* Header strip */}
          <div className="bg-indigo-600 px-8 py-6 flex items-center justify-between">
            <div>
              <div className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Project Brief</div>
              <div className="text-white font-black text-xl tracking-tight">
                {data.company ? `${data.company} × Cynbit` : `${data.name} × Cynbit`}
              </div>
            </div>
            <div className="text-right">
              <div className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Priority</div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-wide ${c.badge}`}>
                <span className="material-symbols-outlined text-sm">verified</span>
                {score.label}
              </div>
            </div>
          </div>

          {/* Lead score bar */}
          <div className="px-8 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex-shrink-0">Lead Score</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full ${c.bar} rounded-full progress-bar`} style={{ width: `${score.score}%` }} />
            </div>
            <span className="text-sm font-black text-slate-700 flex-shrink-0">{score.score}/100</span>
          </div>

          {/* Brief content */}
          <div className="p-8 space-y-8">

            {/* Client info */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">person</span>
                Client Information
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <BriefField label="Name" value={data.name} />
                <BriefField label="Email" value={data.email} />
                <BriefField label="Company" value={data.company || "—"} />
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Project scope */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">architecture</span>
                Project Scope
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <BriefField label="Primary Goal" value={goalLabels[data.goal] || data.goal} />
                <BriefField label="Budget Range" value={budgetLabels[data.budget] || data.budget} />
                <BriefField label="Timeline" value={timelineLabels[data.timeline] || data.timeline} />
              </div>
            </div>

            {/* Services needed */}
            {data.services.length > 0 && (
              <>
                <div className="border-t border-slate-100" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">build</span>
                    Capabilities Required
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.services.map((s) => (
                      <span key={s} className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wide">
                        {serviceLabels[s] || s}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Project details */}
            {data.details && (
              <>
                <div className="border-t border-slate-100" />
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">description</span>
                    Project Description
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">{data.details}</p>
                  </div>
                </div>
              </>
            )}

            <div className="border-t border-slate-100" />

            {/* Recommendations */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Recommended Services
              </div>
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <a
                    key={rec.title}
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                      <span className="material-symbols-outlined text-indigo-600 text-lg group-hover:text-white transition-colors">{rec.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">{rec.title}</div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">{rec.desc}</div>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-500 transition-colors text-sm">north_east</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white text-center slide-up">
          <span className="material-symbols-outlined text-4xl text-indigo-200 mb-4 block">hub</span>
          <h3 className="text-2xl font-black tracking-tight mb-3">Ready to start building?</h3>
          <p className="text-indigo-200 text-sm font-medium mb-6 leading-relaxed max-w-md mx-auto">
            Your brief has been recorded. Cynbit&apos;s architects will reach out within 24 hours to schedule a discovery call.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.cynbit.in/contact" target="_blank" rel="noopener noreferrer">
              <button className="bg-white text-indigo-700 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-50 hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg">
                Also Email Directly
              </button>
            </a>
            <a href="https://www.cynbit.in/case-studies" target="_blank" rel="noopener noreferrer">
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                See Our Work
              </button>
            </a>
          </div>
        </div>

        {/* Restart */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="text-slate-400 hover:text-indigo-600 transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Start Over
          </button>
        </div>

      </div>
    </section>
  );
}

function BriefField({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</div>
      <div className="text-sm font-bold text-slate-800 leading-snug">{value}</div>
    </div>
  );
}
