type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  invert = false,
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center" ? "items-center text-center" : "";
  return (
    <div className={`flex flex-col ${centered} ${className}`} data-reveal>
      <p className={`eyebrow ${invert ? "text-accent" : "text-primary"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-serif text-title ${invert ? "text-white" : "text-stone-900"}`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${invert ? "text-white/70" : "text-stone-600"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
