import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { RESTAURANT, HOURS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-3 md:py-20">
        <div>
          <p className="font-serif text-2xl font-semibold text-white">Giuseppe&apos;s</p>
          <p className="mt-3 text-sm leading-relaxed">
            Italian cucina &amp; cocktail bar in Tacloban City. Wood-fired oven, handmade pasta,
            Leyte welcome.
          </p>
          <a
            href={RESTAURANT.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            <Star className="h-4 w-4 fill-accent text-accent" />
            {RESTAURANT.rating} on Google · {RESTAURANT.reviewCount} reviews
          </a>
        </div>

        <div>
          <p className="eyebrow text-stone-500">Hours</p>
          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Lunch</dt>
              <dd className="text-right tabular-nums text-stone-300">
                {HOURS.Monday.open} – {HOURS.Monday.close}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Dinner</dt>
              <dd className="text-right tabular-nums text-stone-300">
                {HOURS.Monday.open2} – {HOURS.Monday.close2}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Fri &amp; Sat</dt>
              <dd className="text-right tabular-nums text-stone-300">
                {HOURS.Monday.open} – {HOURS.Monday.close} · {HOURS.Monday.open2} – 10:30 PM
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs">Kitchen closes 30 minutes before the listed times.</p>
        </div>

        <div>
          <p className="eyebrow text-stone-500">Find us</p>
          <p className="mt-4 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" />
            {RESTAURANT.address}
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-stone-500" />
            <a href={RESTAURANT.phoneHref} className="transition-colors hover:text-white">
              {RESTAURANT.phone}
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
          <p>© {new Date().getFullYear()} Giuseppe&apos;s · {RESTAURANT.address}</p>
          <p>Photos by our guests &amp; the Giuseppe&apos;s team.</p>
        </div>
      </div>
    </footer>
  );
}
