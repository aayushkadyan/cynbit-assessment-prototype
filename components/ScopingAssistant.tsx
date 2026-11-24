"use client";

import { useState, useRef, useEffect } from "react";
import ProjectBrief from "./ProjectBrief";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Option {
  id: string;
  label: string;
  icon: string;
  description?: string;
  tags?: string[];
}

interface Step {
  id: string;
  question: string;
  subtext?: string;
  type: "single" | "multi" | "text" | "budget" | "timeline";
  options?: Option[];
  placeholder?: string;
  field: keyof FormData;
}

interface FormData {
  goal: string;
  services: string[];
  budget: string;
  timeline: string;
  details: string;
  name: string;
  email: string;
  company: string;
}

// ─── Steps Configuration ─────────────────────────────────────────────────────

const STEPS: Step[] = [
  {
    id: "goal",
    question: "What's your primary goal?",
    subtext: "Tell us what you're trying to achieve. We'll recommend the right path.",
    type: "single",
    field: "goal",
    options: [
      { id: "automate", label: "Automate my business operations", icon: "auto_fix_high", description: "AI agents, LLM workflows, process automation", tags: ["AI Automation", "LLM Agents"] },
      { id: "build", label: "Build a web or mobile product", icon: "devices", description: "Custom software, SaaS, dashboards, apps", tags: ["Full-Stack Dev", "Web & Mobile"] },
      { id: "cloud", label: "Modernize cloud infrastructure", icon: "cloud_sync", description: "AWS/Azure, DevOps, legacy migration", tags: ["Cloud Systems"] },
      { id: "grow", label: "Scale my digital presence", icon: "trending_up", description: "SEO, performance ads, CRM automation", tags: ["Digital Growth", "Marketing"] },
      { id: "product", label: "Explore Cynbit's SaaS products", icon: "inventory_2", description: "TenantEase, Revio, Cynbit Studio", tags: ["Products"] },
      { id: "learn", label: "Join BitElevate internship", icon: "school", description: "60-day remote engineering program", tags: ["BitElevate"] },
    ],
  },
  {
    id: "services",
    question: "Which capabilities do you need?",
    subtext: "Select all that apply — we'll tailor our recommendation.",
    type: "multi",
    field: "services",
    options: [
      { id: "ai_agents", label: "AI & Autonomous Agents", icon: "psychology" },
      { id: "fullstack", label: "Full-Stack Development", icon: "terminal" },
      { id: "mobile", label: "Mobile App Development", icon: "smartphone" },
      { id: "cloud_infra", label: "Cloud & Infrastructure", icon: "cloud" },
      { id: "seo", label: "Technical SEO", icon: "search" },
      { id: "ads", label: "Performance Ads / CRM", icon: "campaign" },
      { id: "data", label: "Data & Analytics", icon: "bar_chart" },
      { id: "design", label: "UI/UX Design Systems", icon: "palette" },
    ],
  },
  {
    id: "budget",
    question: "What's your approximate project budget?",
    subtext: "Helps us recommend the right engagement model for your project.",
    type: "budget",
    field: "budget",
    options: [
      { id: "under_50k", label: "Under ₹50K", icon: "savings", description: "Starter / MVP scope" },
      { id: "50k_200k", label: "₹50K – ₹2L", icon: "account_balance_wallet", description: "Mid-size project" },
      { id: "200k_500k", label: "₹2L – ₹5L", icon: "payments", description: "Full product build" },
      { id: "500k_plus", label: "₹5L+", icon: "monetization_on", description: "Enterprise / long-term" },
      { id: "not_sure", label: "Not sure yet", icon: "help_outline", description: "Let's scope it together" },
    ],
  },
  {
    id: "timeline",
    question: "When do you want to launch?",
    subtext: "Your timeline shapes how we plan the engagement.",
    type: "timeline",
    field: "timeline",
    options: [
      { id: "asap", label: "ASAP — within 2 weeks", icon: "bolt" },
      { id: "1month", label: "Within 1 month", icon: "calendar_month" },
      { id: "3months", label: "1–3 months", icon: "date_range" },
      { id: "flexible", label: "Flexible — planning phase", icon: "pending" },
    ],
  },
  {
    id: "details",
    question: "Describe your project briefly.",
    subtext: "The more context you give, the more tailored your project brief will be.",
    type: "text",
    field: "details",
    placeholder: "e.g. We're building an AI-powered property management platform for landlords in Tier-2 cities. Need backend API, mobile app, and an AI document parser...",
  },
  {
    id: "contact",
    question: "Almost there — where should we send your brief?",
    subtext: "We'll email you a personalized project brief within 24 hours.",
    type: "text",
    field: "name",
    placeholder: "",
  },
];

// ─── Lead Scoring ─────────────────────────────────────────────────────────────

function computeScore(data: FormData): { score: number; label: string; color: string } {
  let score = 0;
  if (data.budget === "500k_plus") score += 40;
  else if (data.budget === "200k_500k") score += 30;
  else if (data.budget === "50k_200k") score += 20;
  else if (data.budget === "under_50k") score += 10;
  if (data.timeline === "asap") score += 30;
  else if (data.timeline === "1month") score += 20;
  else if (data.timeline === "3months") score += 10;
  if (data.services.length >= 3) score += 20;
  else if (data.services.length >= 1) score += 10;
  if (data.details.length > 100) score += 10;
  if (score >= 70) return { score, label: "High Priority", color: "emerald" };
  if (score >= 40) return { score, label: "Qualified Lead", color: "amber" };
  return { score, label: "Exploring", color: "blue" };
}

// ─── Service Recommendations ──────────────────────────────────────────────────

function getRecommendations(data: FormData) {
  const recs: { title: string; desc: string; link: string; icon: string }[] = [];
  if (data.goal === "automate" || data.services.includes("ai_agents")) {
    recs.push({ title: "AI Automation Suite", desc: "LLM agents, voice AI, cognitive workflows", link: "https://www.cynbit.in/services", icon: "psychology" });
  }
  if (data.goal === "build" || data.services.includes("fullstack") || data.services.includes("mobile")) {
    recs.push({ title: "Full-Stack Development", desc: "Web & mobile with Next.js, FastAPI, PostgreSQL", link: "https://www.cynbit.in/services", icon: "terminal" });
  }
  if (data.goal === "cloud" || data.services.includes("cloud_infra")) {
    recs.push({ title: "Cloud & Infrastructure", desc: "AWS/Azure, DevOps, legacy modernization", link: "https://www.cynbit.in/services", icon: "cloud" });
  }
  if (data.goal === "grow" || data.services.includes("seo") || data.services.includes("ads")) {
    recs.push({ title: "Digital Growth Engineering", desc: "Technical SEO, performance ads, CRM automation", link: "https://www.cynbit.in/services", icon: "trending_up" });
  }
  if (data.goal === "product") {
    recs.push({ title: "Cynbit Product Suite", desc: "TenantEase · Revio · Cynbit Studio", link: "https://www.cynbit.in/products", icon: "inventory_2" });
  }
  if (data.goal === "learn") {
    recs.push({ title: "BitElevate Program", desc: "60-day remote internship with daily PR reviews", link: "https://www.cynbit.in/bitelevate", icon: "school" });
  }
  if (recs.length === 0) {
    recs.push({ title: "Custom Consultation", desc: "Let our architects design a tailored solution", link: "https://www.cynbit.in/contact", icon: "hub" });
  }
  return recs.slice(0, 3);
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ScopingAssistant() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>({
    goal: "", services: [], budget: "", timeline: "", details: "", name: "", email: "", company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const totalSteps = STEPS.length;
  const progress = Math.round((step / totalSteps) * 100);
  const currentStep = STEPS[step];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step]);

  const selectSingle = (fieldId: string) => {
    setData((prev) => ({ ...prev, [currentStep.field]: fieldId }));
  };

  const toggleMulti = (optId: string) => {
    setData((prev) => {
      const arr = prev.services;
      return {
        ...prev,
        services: arr.includes(optId) ? arr.filter((x) => x !== optId) : [...arr, optId],
      };
    });
  };

  const canAdvance = () => {
    if (currentStep.type === "single") return !!data[currentStep.field as keyof FormData];
    if (currentStep.type === "multi") return data.services.length > 0;
    if (currentStep.type === "budget") return !!data.budget;
    if (currentStep.type === "timeline") return !!data.timeline;
    if (currentStep.id === "details") return detailsInput.trim().length > 10;
    if (currentStep.id === "contact") {
      return nameInput.trim().length > 1 && emailInput.includes("@");
    }
    return true;
  };

  const advance = () => {
    if (!canAdvance()) {
      setErrors({ [currentStep.id]: "Please complete this step to continue." });
      return;
    }
    setErrors({});
    if (currentStep.id === "details") {
      setData((prev) => ({ ...prev, details: detailsInput }));
    }
    if (currentStep.id === "contact") {
      const newData = { ...data, name: nameInput, email: emailInput, company: companyInput };
      setData(newData);
      setIsAnimating(true);
      setTimeout(() => { setSubmitted(true); setIsAnimating(false); }, 600);
      return;
    }
    setIsAnimating(true);
    setTimeout(() => { setStep((s) => s + 1); setIsAnimating(false); }, 300);
  };

  const goBack = () => {
    setErrors({});
    setIsAnimating(true);
    setTimeout(() => { setStep((s) => s - 1); setIsAnimating(false); }, 300);
  };

  if (submitted) {
    const finalData = { ...data, name: nameInput, email: emailInput, company: companyInput, details: detailsInput };
    const score = computeScore(finalData);
    const recs = getRecommendations(finalData);
    return <ProjectBrief data={finalData} score={score} recommendations={recs} />;
  }

  return (
    <section id="scoping-assistant" className="py-24 px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
            Live Prototype
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6 leading-tight">
            Smart Project Scoping Assistant
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            Answer 6 quick questions. Get a personalized project brief — instantly.
          </p>
        </div>

        {/* Two-column layout: form + sidebar */}
        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">

          {/* ── LEFT: Form Card ── */}
          <div ref={containerRef} className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Progress bar */}
              <div className="h-1.5 bg-slate-100">
                <div
                  className="h-full bg-indigo-600 progress-bar rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Step counter */}
              <div className="px-8 pt-6 pb-2 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Step {step + 1} of {totalSteps}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                  {progress}% complete
                </span>
              </div>

              {/* Step content */}
              <div className={`px-8 pb-8 transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
                <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight leading-tight mt-4">
                  {currentStep.question}
                </h3>
                {currentStep.subtext && (
                  <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">
                    {currentStep.subtext}
                  </p>
                )}

                {/* Single-select options */}
                {(currentStep.type === "single" || currentStep.type === "budget" || currentStep.type === "timeline") && (
                  <div className="space-y-3">
                    {currentStep.options?.map((opt) => {
                      const isSelected = data[currentStep.field as keyof FormData] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => selectSingle(opt.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-start gap-4 group hover:-translate-y-0.5 hover:shadow-md ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100"
                              : "border-slate-200 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-indigo-600" : "bg-slate-100 group-hover:bg-indigo-100"}`}>
                            <span className={`material-symbols-outlined text-xl ${isSelected ? "text-white" : "text-slate-500 group-hover:text-indigo-600"}`}>
                              {opt.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-bold text-sm ${isSelected ? "text-indigo-700" : "text-slate-800"}`}>{opt.label}</div>
                            {opt.description && (
                              <div className="text-xs text-slate-400 font-medium mt-0.5">{opt.description}</div>
                            )}
                            {opt.tags && isSelected && (
                              <div className="flex gap-1.5 mt-2 flex-wrap">
                                {opt.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-wide">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-indigo-600 flex-shrink-0">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Multi-select */}
                {currentStep.type === "multi" && (
                  <div className="grid grid-cols-2 gap-3">
                    {currentStep.options?.map((opt) => {
                      const isSelected = data.services.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => toggleMulti(opt.id)}
                          className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 hover:-translate-y-0.5 hover:shadow-sm ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-slate-200 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-indigo-600" : "bg-slate-100"}`}>
                            <span className={`material-symbols-outlined text-base ${isSelected ? "text-white" : "text-slate-500"}`}>{opt.icon}</span>
                          </div>
                          <span className={`font-bold text-xs leading-tight ${isSelected ? "text-indigo-700" : "text-slate-700"}`}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Text area (details) */}
                {currentStep.id === "details" && (
                  <textarea
                    rows={5}
                    value={detailsInput}
                    onChange={(e) => setDetailsInput(e.target.value)}
                    placeholder={currentStep.placeholder}
                    className="w-full border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-5 py-4 text-sm font-medium text-slate-800 placeholder-slate-300 resize-none outline-none transition-colors leading-relaxed"
                  />
                )}

                {/* Contact fields */}
                {currentStep.id === "contact" && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5 ml-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={nameInput}
                          onChange={(e) => setNameInput(e.target.value)}
                          placeholder="Alex Rivera"
                          className="w-full border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5 ml-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5 ml-1">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={companyInput}
                        onChange={(e) => setCompanyInput(e.target.value)}
                        placeholder="Your Organization"
                        className="w-full border-2 border-slate-200 focus:border-indigo-500 rounded-2xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 outline-none transition-colors"
                      />
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-indigo-600 text-lg flex-shrink-0 mt-0.5">verified_user</span>
                        <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                          Your information is used only to send you the project brief and to initiate a conversation with Cynbit&apos;s team. No spam, ever.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {errors[currentStep.id] && (
                  <p className="mt-3 text-xs text-red-500 font-bold flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {errors[currentStep.id]}
                  </p>
                )}

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-8">
                  {step > 0 && (
                    <button
                      onClick={goBack}
                      className="px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-black text-xs uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-600 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={advance}
                    disabled={!canAdvance()}
                    className={`flex-1 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      canAdvance()
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-0.5 active:scale-95 shadow-indigo-200"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {currentStep.id === "contact" ? (
                      <>Generate My Brief <span className="material-symbols-outlined text-base">auto_awesome</span></>
                    ) : (
                      <>Continue <span className="material-symbols-outlined text-base">arrow_forward</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Context Sidebar ── */}
          <div className="lg:col-span-2 space-y-5 lg:sticky lg:top-28">
            {/* Live summary card */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 pulse-dot inline-block" />
                Your Brief — Building...
              </div>
              <div className="space-y-3">
                <SummaryRow label="Goal" value={data.goal ? STEPS[0].options?.find(o => o.id === data.goal)?.label : undefined} />
                <SummaryRow label="Services" value={data.services.length > 0 ? `${data.services.length} selected` : undefined} />
                <SummaryRow label="Budget" value={data.budget ? STEPS[2].options?.find(o => o.id === data.budget)?.label : undefined} />
                <SummaryRow label="Timeline" value={data.timeline ? STEPS[3].options?.find(o => o.id === data.timeline)?.label : undefined} />
              </div>

              {/* Lead score preview */}
              {data.budget && data.timeline && (
                <div className="mt-5 pt-5 border-t border-slate-200">
                  {(() => {
                    const { label, color } = computeScore(data);
                    const colorMap: Record<string, string> = {
                      emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
                      amber: "bg-amber-100 text-amber-700 border-amber-200",
                      blue: "bg-blue-100 text-blue-700 border-blue-200",
                    };
                    return (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-black uppercase tracking-wide ${colorMap[color]}`}>
                        <span className="material-symbols-outlined text-sm">verified</span>
                        {label}
                      </div>
                    );
                  })()}
                  <p className="text-xs text-slate-400 font-medium mt-2 leading-relaxed">
                    Priority level based on your selections. Affects response time from Cynbit&apos;s team.
                  </p>
                </div>
              )}
            </div>

            {/* Trust signals */}
            <div className="bg-indigo-600 rounded-3xl p-6 text-white">
              <div className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-5">Why Cynbit?</div>
              <div className="space-y-4">
                {[
                  { icon: "bolt", text: "Startup speed, enterprise rigor" },
                  { icon: "psychology", text: "AI-first by design" },
                  { icon: "verified", text: "ISO 9001:2015 certified process" },
                  { icon: "hub", text: "Jaipur HQ · Global delivery" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-base">{item.icon}</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-100">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-indigo-500">
                <div className="text-2xl font-black text-white">24H</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mt-1">Response guarantee</div>
              </div>
            </div>

            {/* Case studies teaser */}
            <div className="border border-slate-200 rounded-3xl p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Recent Work</div>
              <div className="space-y-3">
                {[
                  { name: "WizHealth", tag: "AI · Healthcare", icon: "medical_services" },
                  { name: "Cloudy Tales", tag: "WebSockets · SaaS", icon: "cloud_sync" },
                  { name: "Evento", tag: "Ticketing · Scale", icon: "confirmation_number" },
                ].map((cs) => (
                  <a
                    key={cs.name}
                    href="https://www.cynbit.in/case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-indigo-600 text-base">{cs.icon}</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">{cs.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{cs.tag}</div>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 text-sm ml-auto group-hover:text-indigo-400 transition-colors">north_east</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
      {value ? (
        <span className="text-xs font-bold text-slate-800 text-right max-w-[55%] leading-tight">{value}</span>
      ) : (
        <span className="text-xs text-slate-300 font-medium italic">—</span>
      )}
    </div>
  );
}
