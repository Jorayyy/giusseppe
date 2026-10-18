import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import SectionHeader from "@/components/section-header";
import OpenPill from "@/components/open-pill";
import { HOURS_ORDER } from "@/lib/data";
import { getRestaurant, getHours } from "@/lib/site";

export default async function Visit() {
  const [r, hours] = await Promise.all([getRestaurant(), getHours()]);
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  const formatDay = (day: (typeof HOURS_ORDER)[number]) => {
    const h = hours[day];
    if (!h.open || !h.close) return "Closed";
    const first = `${h.open} – ${h.close}`;
    return h.open2 && h.close2 ? `${first} · ${h.open2} – ${h.close2}` : first;
  };

  return (
    <section id="visit" className="border-t border-line bg-background">
      <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 md:py-32 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <SectionHeader index="IV" eyebrow="Visit" title="Hours & directions" />

          <div className="mt-7" data-reveal>
            <OpenPill hours={hours} />
          </div>

          <table className="mt-6 w-full max-w-lg text-sm" data-reveal>
            <caption className="sr-only">Opening hours</caption>
            <tbody className="divide-y divide-line">
              {HOURS_ORDER.map((day) => (
                <tr key={day} className={day === today ? "text-foreground" : "text-muted"}>
                  <th scope="row" className="py-3.5 pr-4 text-left font-normal">
                    <span className="inline-flex items-center gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${day === today ? "bg-primary" : "bg-transparent"}`}
                        aria-hidden
                      />
                      {day}
                    </span>
                  </th>
                  <td className="py-3.5 text-right tabular-nums">{formatDay(day)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 max-w-lg space-y-4 text-sm text-muted" data-reveal>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {r.address}
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              <a href={r.phoneHref} className="link-underline font-medium text-foreground">
                {r.phone}
              </a>
            </p>
          </div>
        </div>

        <figure className="lg:col-span-6" data-reveal style={{ transitionDelay: "120ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
            <Image
              src="/photos/interior-2.jpg"
              alt="Tables set for service at Giuseppe's"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <a
              href={r.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 left-5 bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
            >
              Get directions →
            </a>
          </div>
          <figcaption className="mt-4 font-serif text-sm italic text-muted">{r.address}</figcaption>
        </figure>
      </div>
    </section>
  );
}
