import { Martini, Baby, Dog, Wine } from "lucide-react";

export default function About() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <h2 className="font-serif text-xl font-semibold">About</h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">
        A little corner of Italy on Avenida Veteranos. Wood-fired pizzas, handmade pasta, and a bar that takes its cocktails seriously. Giuseppe opened in 2019 with his Tacloban-born wife — the name is his, the recipes are nonna&apos;s.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: Martini, label: "Great cocktails" },
          { icon: Baby, label: "High chairs" },
          { icon: Dog, label: "Dogs allowed outside" },
          { icon: Wine, label: "Great wine list" },
        ].map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700">
            <s.icon className="h-3.5 w-3.5" /> {s.label}
          </span>
        ))}
      </div>
    </section>
  );
}
