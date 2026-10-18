type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  index?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  index,
  align = "left",
  invert = false,
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center" ? "items-center text-center" : "";
  return (
    <div className={`flex flex-col ${centered} ${className}`} data-reveal>
      <div className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
        {index && (
          <span
            className={`eyebrow ${invert ? "text-accent" : "text-primary"}`}
            aria-hidden
          >
            {index}
          </span>
        )}
        <span className={`h-px w-7 ${invert ? "bg-white/25" : "bg-line"}`} aria-hidden />
        <p className={`eyebrow ${invert ? "text-white/60" : "text-muted"}`}>{eyebrow}</p>
      </div>
      <h2 className={`mt-5 font-serif text-title ${invert ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed ${invert ? "text-white/70" : "text-muted"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
