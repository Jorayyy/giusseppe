import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export const fieldClass =
  "w-full rounded-2xl border border-line bg-white/80 px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-stone-400 focus:border-primary";

export const fieldMonoClass = `${fieldClass} font-mono uppercase tracking-wider`;

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary hover:text-white disabled:opacity-50";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground disabled:opacity-50";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-50";

export const btnDanger =
  "inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50";

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 pb-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker && <p className="eyebrow text-stone-400">{kicker}</p>}
        <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow text-stone-400">{label}</p>
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-4 truncate font-serif text-3xl font-semibold leading-none text-foreground">{value}</p>
      {hint && <p className="mt-2 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "primary" | "muted";
}) {
  const tones = {
    default: "border-line text-muted",
    primary: "border-primary/30 bg-primary/10 text-primary",
    muted: "border-line text-stone-400",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-xl">
      {message}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && (
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface text-primary">
          {icon}
        </div>
      )}
      <p className="font-serif text-xl text-foreground">{title}</p>
      {description && <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>}
    </div>
  );
}
