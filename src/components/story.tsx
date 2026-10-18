import Image from "next/image";
import SectionHeader from "@/components/section-header";
import { getRestaurant } from "@/lib/site";

export default async function Story() {
  const r = await getRestaurant();
  const stats = [
    { value: `${r.rating}`, label: `${r.reviewCount} Google reviews` },
    { value: r.priceRange, label: "Average spend" },
    { value: "Daily", label: "Lunch & dinner" },
  ];

  return (
    <section id="story" className="bg-background">
      <div className="mx-auto grid max-w-[1240px] items-start gap-14 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-7">
          <SectionHeader
            index="I"
            eyebrow="Our story"
            title="A little Italy on Avenida Veteranos"
          />

          <div
            className="mt-8 gap-8 text-[15px] leading-relaxed text-muted md:columns-2 [&>p]:mb-4"
            data-reveal
          >
            <p>
              Giuseppe&apos;s has been serving Tacloban proper Italian cooking — dough proofed
              slowly and fired in a wood oven, pasta made by hand, and recipes that don&apos;t rush
              anything.
            </p>
            <p>
              The room is warm, brick walls and all, and the welcome is pure Leyte. Come for Sunday
              lunch with the family, date night with a carafe of wine, or cocktails at the bar.
            </p>
            <p>
              Dogs are welcome outside, high chairs are always ready, and somebody&apos;s
              grandmother is usually at table five.
            </p>
          </div>

          <dl
            className="mt-10 grid max-w-lg grid-cols-3 gap-3"
            data-reveal
          >
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-surface px-4 py-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-serif text-2xl text-foreground">{stat.value}</dd>
                <dd className="eyebrow mt-1.5 text-stone-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="lg:col-span-5" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface">
            <Image
              src="/photos/3.jpg"
              alt="Guests enjoying lunch at Giuseppe's"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-4 font-serif text-sm text-muted">
            Lunch service on Avenida Veteranos.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
