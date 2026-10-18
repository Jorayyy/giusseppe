import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { getRestaurant, getHours } from "@/lib/site";

export default async function Footer() {
  const [r, hours] = await Promise.all([getRestaurant(), getHours()]);
  const mon = hours.Monday;
  const friSat = hours.Friday;

  return (
    <footer className="mx-3 mb-3 overflow-hidden rounded-[2.5rem] bg-foreground text-stone-400 sm:mx-5">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-8 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl text-background">
            Giuseppe<span className="text-primary">’s</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Italian cucina &amp; cocktail bar in Tacloban City. Wood-fired oven, handmade pasta,
            Leyte welcome.
          </p>
          <a
            href={r.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-stone-300 transition-colors hover:text-white"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {r.rating} on Google · {r.reviewCount} reviews
          </a>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-stone-500">Hours</p>
          <dl className="mt-5 space-y-2 text-sm">
            {[
              mon.open ? { dt: "Lunch", dd: `${mon.open} – ${mon.close}` } : null,
              mon.open2 && mon.close2
                ? { dt: "Dinner", dd: `${mon.open2} – ${mon.close2}` }
                : null,
              friSat.open
                ? {
                    dt: "Fri & Sat",
                    dd: `${friSat.open} – ${friSat.close}${
                      friSat.open2 && friSat.close2 ? ` · ${friSat.open2} – ${friSat.close2}` : ""
                    }`,
                  }
                : null,
            ]
              .filter((row): row is { dt: string; dd: string } => row !== null)
              .map((row) => (
                <div key={row.dt} className="grid grid-cols-[4.75rem_1fr] items-baseline gap-x-4">
                  <dt className="text-stone-500">{row.dt}</dt>
                  <dd className="border-l border-stone-800 pl-3 tabular-nums leading-relaxed text-stone-300">
                    {row.dd}
                  </dd>
                </div>
              ))}
          </dl>
          <p className="mt-4 text-xs text-stone-600">
            Kitchen closes 30 minutes before the listed times.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-stone-500">Find us</p>
          <p className="mt-5 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            {r.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-stone-500" />
            <a href={r.phoneHref} className="transition-colors hover:text-white">
              {r.phone}
            </a>
          </p>
          <nav className="mt-8 flex flex-col gap-2.5">
            {[
              { label: "Menu", href: "/menu" },
              { label: "Gallery", href: "/#gallery" },
              { label: "Visit", href: "/#visit" },
              { label: "Reserve", href: "/#reserve" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="eyebrow w-fit text-stone-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-8 py-6 text-xs text-stone-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {r.name} · {r.address}</p>
          <p>Photos by our guests &amp; the Giuseppe&apos;s team.</p>
        </div>
      </div>
    </footer>
  );
}
