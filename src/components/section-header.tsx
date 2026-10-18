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
      <div className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
        {index && (
          <span
            className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-semibold ${
              invert ? "bg-white/15 text-white" : "bg-primary text-background"
            }`}
            aria-hidden
          >
            {index}
          </span>
        )}
        <p className={`eyebrow ${invert ? "text-white/60" : "text-muted"}`}>{eyebrow}</p>
      </div>
      <h2 className={`mt-4 font-serif text-title ${invert ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 max-w-xl text-[15px] leading-relaxed ${invert ? "text-white/70" : "text-muted"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
