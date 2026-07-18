"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, Bot, Check, CheckCircle2, ClipboardList, Loader2, MessageSquare, Send, Sparkles, UserRound } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { AppLocale } from "@/lib/i18n/config";
import type { AssessmentInput, ContaminationType, Recommendation } from "@/lib/recommendation/types";
import { recommendationEngine } from "@/lib/recommendation/rule-engine";
import { assessmentSchema } from "@/lib/recommendation/assessment-schema";

const defaults: AssessmentInput = {
  country: "Kenya",
  region: "Makueni",
  climate: "arid",
  settlement: "rural",
  primaryWaterSource: "well",
  sourceReliability: "weekly",
  waterAppearance: "cloudy",
  suspectedContamination: ["sediment", "pathogens"],
  familySize: 5,
  monthlyBudgetUsd: 20,
  hasElectricity: false,
  hasInternet: false,
  availableMaterials: ["sand", "gravel", "bucket", "PVC"],
  availableTools: ["bucket", "sieve"],
  mainConcern: "safety",
  primaryUse: "drinking",
  priority: "highest-safety"
};

const contaminationOptions: ContaminationType[] = ["sediment", "pathogens", "salinity", "chemicals", "turbidity", "unknown"];

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function WaterAdvisor({ dictionary, locale }: { dictionary: Dictionary; locale: AppLocale }) {
  const [mode, setMode] = useState<"guided" | "chat">("guided");
  const [form, setForm] = useState<AssessmentInput>(defaults);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: dictionary.advisor.chatWelcome
    }
  ]);

  const reasonText = useMemo(() => {
    if (!recommendation) return [];
    return recommendation.reasons.map((reason) => {
      return dictionary.reasons[reason as keyof typeof dictionary.reasons] ?? reason;
    });
  }, [recommendation, dictionary]);

  function update<K extends keyof AssessmentInput>(key: K, value: AssessmentInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function generateRecommendation() {
    const hydrated = {
      ...form,
      availableMaterials: splitList(form.availableMaterials),
      availableTools: splitList(form.availableTools)
    };

    const parsed = assessmentSchema.safeParse(hydrated);
    if (!parsed.success) {
      setError(dictionary.advisor.validationError);
      return;
    }

    setError("");
    setRecommendation(await recommendationEngine.recommend(parsed.data, locale));
  }

  async function sendChatMessage(content = chatInput) {
    const trimmed = content.trim();
    if (!trimmed || chatLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed
    };

    const nextMessages = [...chatMessages, userMessage];
    setChatMessages(nextMessages);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/advisor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          messages: nextMessages
            .filter((message) => message.id !== "welcome")
            .slice(-10)
            .map(({ role, content }) => ({ role, content }))
        })
      });

      const data = (await response.json()) as { reply?: string };
      setChatMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply || dictionary.advisor.chatError
        }
      ]);
    } catch {
      setChatMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: dictionary.advisor.chatError
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <div className="reveal-up grid items-start gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <section className={`interactive-lift relative overflow-hidden rounded-lg border border-white/80 bg-white/[0.9] p-5 shadow-[0_28px_90px_rgba(6,35,57,0.14)] ring-1 ring-ocean-100/80 backdrop-blur ${mode === "chat" ? "lg:col-span-2" : ""}`}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#075f8e,#2dd4bf,#f7c35f)]" />
        <div className="mb-6 inline-grid grid-cols-2 rounded-lg border border-ocean-100 bg-slate-50 p-1 shadow-inner">
          <button className={tabClass(mode === "guided")} onClick={() => setMode("guided")} type="button">
            <ClipboardList size={17} aria-hidden />
            {dictionary.advisor.guided}
          </button>
          <button className={tabClass(mode === "chat")} onClick={() => setMode("chat")} type="button">
            <MessageSquare size={17} aria-hidden />
            {dictionary.advisor.chat}
          </button>
        </div>

        {mode === "guided" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label={dictionary.form.country} value={form.country} onChange={(value) => update("country", value)} />
            <TextField label={dictionary.form.region} value={form.region} onChange={(value) => update("region", value)} />
            <SelectField dictionary={dictionary} label={dictionary.form.climate} value={form.climate} options={["arid", "tropical", "temperate", "cold", "variable"]} onChange={(value) => update("climate", value as AssessmentInput["climate"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.settlement} value={form.settlement} options={["rural", "urban"]} onChange={(value) => update("settlement", value as AssessmentInput["settlement"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.source} value={form.primaryWaterSource} options={["rain", "well", "river", "lake", "piped", "truck", "spring"]} onChange={(value) => update("primaryWaterSource", value as AssessmentInput["primaryWaterSource"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.reliability} value={form.sourceReliability} options={["daily", "weekly", "seasonal", "unreliable"]} onChange={(value) => update("sourceReliability", value as AssessmentInput["sourceReliability"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.appearance} value={form.waterAppearance} options={["clear", "cloudy", "colored", "smelly"]} onChange={(value) => update("waterAppearance", value as AssessmentInput["waterAppearance"])} />
            <NumberField label={dictionary.form.family} value={form.familySize} onChange={(value) => update("familySize", value)} />
            <NumberField label={dictionary.form.budget} value={form.monthlyBudgetUsd} onChange={(value) => update("monthlyBudgetUsd", value)} />
            <SelectField dictionary={dictionary} label={dictionary.form.concern} value={form.mainConcern} options={["cost", "safety", "speed", "maintenance", "capacity"]} onChange={(value) => update("mainConcern", value as AssessmentInput["mainConcern"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.use} value={form.primaryUse} options={["drinking", "cooking", "washing", "irrigation"]} onChange={(value) => update("primaryUse", value as AssessmentInput["primaryUse"])} />
            <SelectField dictionary={dictionary} label={dictionary.form.priority} value={form.priority} options={["lowest-cost", "highest-safety", "fastest", "lowest-maintenance"]} onChange={(value) => update("priority", value as AssessmentInput["priority"])} />
            <TextField label={dictionary.form.materials} value={form.availableMaterials.join(", ")} onChange={(value) => update("availableMaterials", splitList(value))} />
            <TextField label={dictionary.form.tools} value={form.availableTools.join(", ")} onChange={(value) => update("availableTools", splitList(value))} />
            <div className="sm:col-span-2">
              <p className="mb-2 text-sm font-semibold text-slate-700">{dictionary.form.contamination}</p>
              <div className="flex flex-wrap gap-2">
                {contaminationOptions.map((item) => (
                  <label key={item} className={chipClass(form.suspectedContamination.includes(item))}>
                    <input
                      className="sr-only"
                      type="checkbox"
                      checked={form.suspectedContamination.includes(item)}
                      onChange={(event) => {
                        const next = event.target.checked
                          ? [...form.suspectedContamination, item]
                          : form.suspectedContamination.filter((value) => value !== item);
                        update("suspectedContamination", next);
                      }}
                    />
                    <span className="grid h-4 w-4 place-items-center rounded-full border border-current">
                      {form.suspectedContamination.includes(item) ? <Check size={11} strokeWidth={3} aria-hidden /> : null}
                    </span>
                    {optionLabel(dictionary, item)}
                  </label>
                ))}
              </div>
            </div>
            <Toggle label={dictionary.form.electricity} checked={form.hasElectricity} onChange={(value) => update("hasElectricity", value)} />
            <Toggle label={dictionary.form.internet} checked={form.hasInternet} onChange={(value) => update("hasInternet", value)} />
          </div>
        ) : (
          <ChatPanel
            dictionary={dictionary}
            messages={chatMessages}
            input={chatInput}
            loading={chatLoading}
            onInputChange={setChatInput}
            onSend={() => sendChatMessage()}
            onExample={(example) => sendChatMessage(example)}
          />
        )}

        {mode === "guided" ? (
          <>
            <button className="focus-ring mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(135deg,#075f8e,#0d9488)] px-5 font-semibold text-white shadow-[0_18px_36px_rgba(7,95,142,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_22px_44px_rgba(7,95,142,0.28)]" onClick={generateRecommendation} type="button">
              <Sparkles size={18} aria-hidden />
              {dictionary.advisor.recommend}
            </button>
            {error ? <p className="mt-3 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
          </>
        ) : null}
      </section>

      {mode === "guided" ? (
        <section className="interactive-lift relative overflow-hidden rounded-lg border border-ocean-100/80 bg-[linear-gradient(180deg,#f8fdff_0%,#eefafa_100%)] p-5 shadow-[0_28px_90px_rgba(6,35,57,0.12)]">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-aqua-400/20" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-ocean-500/10" />
          {recommendation ? (
            <ResultCard recommendation={recommendation} dictionary={dictionary} locale={locale} reasons={reasonText} />
          ) : (
            <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-ocean-100 bg-white/[0.86] p-8 text-center shadow-inner">
              <div>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-aqua-100 text-aqua-600 shadow-[0_12px_30px_rgba(13,148,136,0.16)]">
                  <CheckCircle2 size={34} aria-hidden />
                </span>
                <div className="mx-auto mt-5 grid w-36 grid-cols-5 gap-1.5">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span key={item} className="h-1.5 rounded-full bg-[linear-gradient(90deg,#0c8cc8,#2dd4bf)] opacity-70" />
                  ))}
                </div>
                <p className="mt-4 text-xl font-semibold text-ocean-950">{dictionary.advisor.result}</p>
                <p className="mt-2 max-w-md text-slate-600">{dictionary.advisor.subtitle}</p>
              </div>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

function ChatPanel({
  dictionary,
  messages,
  input,
  loading,
  onInputChange,
  onSend,
  onExample
}: {
  dictionary: Dictionary;
  messages: ChatMessage[];
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onExample: (value: string) => void;
}) {
  return (
    <div className="rounded-lg border border-ocean-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fdff_100%)] p-3 shadow-inner">
      <div className="mb-3 flex items-start gap-3 rounded-lg border border-aqua-100 bg-aqua-100/55 p-3 text-sm leading-6 text-ocean-950">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-white text-aqua-600 shadow-sm">
          <Bot size={17} aria-hidden />
        </span>
        <p>{dictionary.advisor.chatScope}</p>
      </div>

      <div className="max-h-[430px] min-h-[360px] space-y-4 overflow-y-auto rounded-lg bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.12),transparent_34%),rgba(255,255,255,0.76)] p-3">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ocean-950 text-white">
                <Bot size={16} aria-hidden />
              </span>
            ) : null}
            <div className={messageBubbleClass(message.role)}>
              <p className="whitespace-pre-line text-sm leading-6">{message.content}</p>
            </div>
            {message.role === "user" ? (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-aqua-100 text-ocean-700">
                <UserRound size={16} aria-hidden />
              </span>
            ) : null}
          </div>
        ))}
        {loading ? (
          <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
            <Loader2 className="animate-spin text-aqua-600" size={18} aria-hidden />
            {dictionary.advisor.chatThinking}
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {dictionary.advisor.chatExamples.map((example) => (
          <button
            key={example}
            className="focus-ring rounded-lg border border-ocean-100 bg-white px-3 py-2 text-left text-xs font-semibold text-ocean-700 transition hover:border-aqua-400/60 hover:bg-ocean-50"
            type="button"
            onClick={() => onExample(example)}
            disabled={loading}
          >
            {example}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <textarea
          className="focus-ring min-h-12 flex-1 resize-none rounded-lg border border-slate-200 bg-white/[0.95] px-3 py-3 text-sm text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_rgba(6,35,57,0.04)] placeholder:text-slate-400"
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSend();
            }
          }}
          placeholder={dictionary.advisor.chatPlaceholder}
          rows={1}
        />
        <button
          className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-ocean-700 px-4 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(7,95,142,0.22)] transition hover:bg-ocean-950 disabled:cursor-not-allowed disabled:opacity-55"
          type="button"
          onClick={onSend}
          disabled={loading || !input.trim()}
        >
          <Send size={17} aria-hidden />
          <span className="hidden sm:inline">{dictionary.advisor.chatSend}</span>
        </button>
      </div>
    </div>
  );
}

function ResultCard({ recommendation, dictionary, locale, reasons }: { recommendation: Recommendation; dictionary: Dictionary; locale: AppLocale; reasons: string[] }) {
  const solution = recommendation.primary;
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/80 bg-white p-6 shadow-[0_24px_68px_rgba(6,35,57,0.13)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#075f8e,#2dd4bf,#f7c35f)]" />
      <p className="text-sm font-semibold text-aqua-600">{dictionary.advisor.result}</p>
      <h2 className="mt-2 text-3xl font-semibold text-ocean-950">{solution.name[locale]}</h2>
      <p className="mt-3 leading-7 text-slate-700">{solution.summary[locale]}</p>
      <div className="mt-5 rounded-lg bg-[linear-gradient(135deg,#062339,#075f8e_62%,#0d9488)] p-4 text-white shadow-[0_18px_42px_rgba(6,35,57,0.2)]">
        <p className="text-sm text-white/70">{dictionary.advisor.cost}</p>
        <p className="text-2xl font-semibold">${recommendation.estimatedCostUsd.min} - ${recommendation.estimatedCostUsd.max}</p>
      </div>
      <InfoList title={dictionary.advisor.why} items={reasons} />
      <InfoList title={dictionary.advisor.materials} items={solution.materials[locale]} />
      <InfoList title={dictionary.advisor.instructions} items={solution.instructions[locale]} ordered />
      <InfoBlock title={dictionary.advisor.maintenance} body={solution.maintenance[locale]} />
      <InfoList title={dictionary.advisor.advantages} items={solution.advantages[locale]} />
      <InfoList title={dictionary.advisor.limitations} items={solution.limitations[locale]} />
      <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h3 className="flex items-center gap-2 font-semibold text-amber-900">
          <AlertTriangle size={18} aria-hidden />
          {dictionary.advisor.warnings}
        </h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-amber-900">
          {solution.warnings[locale].map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      </div>
      {recommendation.alternative ? (
        <InfoBlock title={dictionary.advisor.alternative} body={`${recommendation.alternative.name[locale]}: ${recommendation.alternative.summary[locale]}`} />
      ) : null}
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input className={fieldClass} type="number" min={0} value={value} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}

function SelectField({ dictionary, label, value, options, onChange }: { dictionary: Dictionary; label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabel(dictionary, option)}
          </option>
        ))}
      </select>
    </label>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white/[0.88] px-3 py-3 text-sm font-semibold text-slate-700 shadow-[0_8px_22px_rgba(6,35,57,0.04)] transition hover:border-aqua-400/50">
      {label}
      <input className="sr-only" type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className={`relative h-6 w-11 rounded-full border transition ${checked ? "border-aqua-600 bg-aqua-600" : "border-slate-300 bg-slate-100"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${checked ? "left-5" : "left-0.5"}`} />
      </span>
    </label>
  );
}

function InfoList({ title, items, ordered = false }: { title: string; items: string[]; ordered?: boolean }) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className="mt-5 border-t border-slate-100 pt-5">
      <h3 className="font-semibold text-ocean-950">{title}</h3>
      <List className={`${ordered ? "list-decimal" : "list-disc"} mt-2 space-y-1 pl-5 text-sm leading-6 text-slate-700`}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    </div>
  );
}

function InfoBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-5 border-t border-slate-100 pt-5">
      <h3 className="font-semibold text-ocean-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
    </div>
  );
}

function tabClass(active: boolean) {
  return `focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition ${active ? "bg-white text-ocean-700 shadow-sm" : "text-slate-600 hover:text-ocean-700"}`;
}

function messageBubbleClass(role: ChatMessage["role"]) {
  return role === "user"
    ? "max-w-[82%] rounded-lg bg-ocean-700 px-4 py-3 text-white shadow-[0_12px_28px_rgba(7,95,142,0.2)]"
    : "max-w-[82%] rounded-lg border border-slate-100 bg-white px-4 py-3 text-slate-700 shadow-[0_12px_28px_rgba(6,35,57,0.08)]";
}

const fieldClass =
  "focus-ring mt-1 h-11 w-full rounded-lg border border-slate-200 bg-white/[0.9] px-3 text-slate-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_22px_rgba(6,35,57,0.04)] transition placeholder:text-slate-400 hover:border-ocean-100";

function chipClass(active: boolean) {
  return `focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-aqua-600 inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
    active
      ? "border-aqua-600 bg-aqua-100 text-ocean-950 shadow-[0_10px_24px_rgba(13,148,136,0.14)]"
      : "border-slate-200 bg-white/[0.86] text-slate-700 hover:border-aqua-400/60 hover:bg-ocean-50"
  }`;
}

function splitList(value: string[] | string) {
  if (Array.isArray(value)) return value;
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function optionLabel(dictionary: Dictionary, option: string) {
  return dictionary.options[option as keyof typeof dictionary.options] ?? option;
}
