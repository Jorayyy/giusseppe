import { MENU, RESTAURANT } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Menu — ${RESTAURANT.name}`,
  description: `View the full menu at ${RESTAURANT.name}. Wood-fired pizzas, handmade pasta, grilled meats, and more. Authentic Italian in Tacloban City.`,
  openGraph: {
    title: `Menu — ${RESTAURANT.name}`,
    description: `Wood-fired pizzas, handmade pasta, grilled meats, and more.`,
    url: "https://giusseppe.vercel.app/menu",
    siteName: "Giuseppe's",
    locale: "en_PH",
    type: "website",
  },
};

export default function MenuPage() {
  const categories = Object.entries(MENU);

  return (
    <main className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="font-serif text-xl font-semibold text-stone-900">
            {RESTAURANT.name}
          </Link>
          <Link
            href="/"
            className="rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
          >
            Back to Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold text-stone-900">Our Menu</h1>
          <p className="mt-2 text-stone-500">Authentic Italian flavors, made with love</p>
        </div>

        {categories.map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="mb-6 border-b border-stone-200 pb-2 font-serif text-2xl font-semibold text-stone-800">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="group overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-semibold text-stone-900">
                        {item.name}
                        {item.popular && (
                          <span className="ml-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                            Popular
                          </span>
                        )}
                      </h3>
                      <span className="shrink-0 text-lg font-semibold text-emerald-700">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-stone-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 rounded-xl border border-stone-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-stone-500">Prices are in Philippine Pesos (PHP). Menu items subject to availability.</p>
          <p className="mt-2 text-sm text-stone-500">
            For reservations and takeout, <a href={RESTAURANT.phoneHref} className="font-medium text-amber-700 underline underline-offset-2 hover:text-amber-800">call us</a>
          </p>
        </div>
      </div>
    </main>
  );
}