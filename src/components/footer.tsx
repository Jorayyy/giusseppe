import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { getRestaurant, getHours } from "@/lib/site";
export default async function Footer() {
  const [r, hours] = await Promise.all([getRestaurant(), getHours()]);
  const mon = hours.Monday;
  const friSat = hours.Friday;

  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-3 md:py-20">
        <div>
          <p className="font-serif text-2xl font-semibold text-white">{r.name}</p>
          <p className="mt-3 text-sm leading-relaxed">
            Italian cucina &amp; cocktail bar in Tacloban City. Wood-fired oven, handmade pasta,
            Leyte welcome.
          </p>
          <a
            href={r.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {r.rating} on Google · {r.reviewCount} reviews
          </a>
        </div>

        <div>
          <p className="eyebrow text-stone-500">Hours</p>
          <dl className="mt-4 space-y-1.5 text-sm">
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
                  <dd className="text-right tabular-nums leading-relaxed text-stone-300">{row.dd}</dd>
                </div>
              ))}
          </dl>
          <p className="mt-3 text-xs">Kitchen closes 30 minutes before the listed times.</p>
        </div>

        <div>
          <p className="eyebrow text-stone-500">Find us</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            {r.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-stone-500" />
            <a href={r.phoneHref} className="transition-colors hover:text-white">
              {r.phone}
            </a>
          </p>
          <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/menu" className="transition-colors hover:text-white">
              Menu
            </Link>
            <Link href="/#gallery" className="transition-colors hover:text-white">
              Gallery
            </Link>
            <Link href="/#visit" className="transition-colors hover:text-white">
              Visit
            </Link>
            <Link href="/#reserve" className="transition-colors hover:text-white">
              Reserve
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {r.name} · {r.address}</p>
          <p>Photos by our guests &amp; the Giuseppe&apos;s team.</p>
        </div>
      </div>
    </footer>
  );
}
