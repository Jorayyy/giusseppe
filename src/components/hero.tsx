import Image from "next/image";
import Link from "next/link";
import { Flame, Wheat, Martini, MapPin } from "lucide-react";
import { getHours } from "@/lib/site";

export default async function Hero() {
  const hours = await getHours();
  const monday = hours.Monday;
  const friday = hours.Friday;
  const hoursLabel =
    monday?.open && (friday?.close2 || friday?.close)
      ? `${monday.open.replace(":00", "")} – ${(friday.close2 || friday.close).replace(":00", "")}`
      : "11 AM – late";

  const chips = [
    { icon: Flame, label: "Wood-fired oven", position: "left-[6%] top-[20%]" },
    { icon: Wheat, label: "Handmade pasta", position: "right-[7%] top-[34%]" },
    { icon: Martini, label: "Cocktails till late", position: "left-[10%] top-[48%]" },
  ];

  return (
    <section className="px-3 pt-3 sm:px-5">
      <div className="relative mx-auto min-h-[88svh] max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-foreground">
        <Image
          src="/photos/hero.jpg"
          alt="The dining room at Giuseppe's, Tacloban City"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/25 to-foreground/15" />

        {chips.map((chip, i) => (
          <div
            key={chip.label}
            className={`absolute hidden items-center gap-2.5 lg:flex ${chip.position}`}
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/90 text-background shadow-lg">
              <chip.icon className="h-5 w-5" />
            </span>
            <span className="glass-dark rounded-full px-4 py-2 text-sm font-medium text-white">
              {chip.label}
            </span>
          </div>
        ))}

        <div className="relative z-10 flex min-h-[88svh] flex-col justify-end px-6 pb-10 pt-28 sm:px-12 sm:pb-14">
          <p className="eyebrow text-white/70">Cucina Italiana · Tacloban City</p>

          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.9rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.03em] text-white">
            Wood-fired pizza.
            <br />
            <span className="text-accent-light">Handmade pasta.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/75">
            An Italian osteria on Avenida Veteranos — slow-proofed dough, pasta rolled by hand, and
            cocktails poured until late.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#reserve"
              className="rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-white"
            >
              Reserve a table
            </a>
            <Link
              href="/menu"
              className="glass-dark inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/25"
            >
              See the menu
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <span className="glass-dark inline-flex items-center rounded-full px-4 py-2 text-xs font-medium text-white/90">
              Open daily {hoursLabel}
            </span>
            <span className="glass-dark inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-white/90">
              <MapPin className="h-3.5 w-3.5" /> Avenida Veteranos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
