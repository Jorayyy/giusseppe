import Image from "next/image";
import { MapPin, Phone, Navigation } from "lucide-react";
import SectionHeader from "@/components/section-header";
import OpenPill from "@/components/open-pill";
import { RESTAURANT, HOURS, HOURS_ORDER } from "@/lib/data";

function formatDay(day: (typeof HOURS_ORDER)[number]) {
  const h = HOURS[day];
  const first = `${h.open} – ${h.close}`;
  return h.open2 ? `${first} · ${h.open2} – ${h.close2}` : first;
}

export default function Visit() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section id="visit" className="bg-background">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeader eyebrow="Visit" title="Hours & directions" />
          <div className="mt-6" data-reveal>
            <OpenPill />
          </div>

          <table className="mt-6 w-full max-w-lg text-sm" data-reveal>
            <caption className="sr-only">Opening hours</caption>
            <tbody className="divide-y divide-stone-200/70">
              {HOURS_ORDER.map((day) => (
                <tr
                  key={day}
                  className={day === today ? "bg-surface font-semibold text-stone-900" : "text-stone-600"}
                >
                  <th scope="row" className={`py-3 pr-4 text-left font-normal ${day === today ? "pl-3" : ""}`}>
                    {day}
                  </th>
                  <td className={`py-3 text-right tabular-nums ${day === today ? "pr-3" : ""}`}>
                    {formatDay(day)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 max-w-lg space-y-3 text-sm text-stone-600" data-reveal>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
              {RESTAURANT.address}
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-stone-400" />
              <a href={RESTAURANT.phoneHref} className="link-underline font-medium text-stone-900">
                {RESTAURANT.phone}
              </a>
            </p>
          </div>
        </div>

        <figure className="lg:col-span-6" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-[4/5]">
            <Image
              src="/photos/interior-2.jpg"
              alt="Tables set for service at Giuseppe's"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <a
              href={RESTAURANT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-stone-900 shadow-lg transition hover:bg-stone-100"
            >
              <Navigation className="h-4 w-4 text-primary" />
              Get directions
            </a>
          </div>
          <figcaption className="mt-3 font-serif text-sm italic text-stone-500">
            173 Avenida Veteranos, Tacloban City.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
