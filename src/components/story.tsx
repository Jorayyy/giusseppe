import Image from "next/image";
import SectionHeader from "@/components/section-header";
import { getRestaurant } from "@/lib/site";

export default async function Story() {
  const r = await getRestaurant();
  const stats = [
    { value: `${r.rating}`, label: `${r.reviewCount} Google reviews` },
    { value: "★", label: r.priceRange },
    { value: "Daily", label: "11 AM – late" },
  ];

  return (
    <section id="story" className="bg-background">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeader
            eyebrow="Our story"
            title="A little Italy on Avenida Veteranos"
          />
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-stone-600" data-reveal>
            <p>
              Giuseppe&apos;s has been serving Tacloban proper Italian cooking — dough proofed
              slowly and fired in a wood oven, pasta made by hand, and recipes that don&apos;t
              rush anything. The room is warm, brick walls and all, and the welcome is pure Leyte.
            </p>
            <p>
              Come for Sunday lunch with the family, date night with a carafe of wine, or
              cocktails at the bar. Dogs are welcome outside, high chairs are always ready, and
              somebody&apos;s grandmother is usually at table five.
            </p>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-stone-200 pt-8" data-reveal>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl font-semibold text-stone-900">{stat.value}</dd>
                <dd className="mt-1 text-xs uppercase tracking-[0.1em] text-stone-500">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-5" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/photos/3.jpg"
              alt="Guests enjoying lunch at Giuseppe's"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-3 font-serif text-sm italic text-stone-500">
            Lunch service on Avenida Veteranos.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
