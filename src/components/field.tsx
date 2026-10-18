import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const inputBase =
  "mt-2 w-full rounded-2xl border border-line bg-white/80 px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-stone-400 focus:border-primary";

export function Field({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500">{label}</span>
      <input {...props} className={`${inputBase} ${props.className ?? ""}`} />
    </label>
  );
}

export function SelectField({
  label,
  children,
  ...props
}: { label: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500">{label}</span>
      <select {...props} className={`${inputBase} cursor-pointer ${props.className ?? ""}`}>
        {children}
      </select>
    </label>
  );
}

export function TextAreaField({
  label,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="eyebrow text-stone-500">{label}</span>
      <textarea {...props} className={`${inputBase} resize-none ${props.className ?? ""}`} />
    </label>
  );
}
