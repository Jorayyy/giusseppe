import Link from "next/link";
import { Metadata } from "next";
import { Star, Phone } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getMenu } from "@/lib/menu";
import { RESTAURANT } from "@/lib/data";

export const revalidate = 60;

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

export default async function MenuPage() {
  const menu = await getMenu();
  const categories = Object.entries(menu).filter(([, items]) => items.length > 0);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <header className="border-b border-stone-200/70">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
            <p className="eyebrow text-primary">Giuseppe&apos;s · Tacloban City</p>
            <h1 className="mt-4 font-serif text-display text-stone-900">The menu</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-600">
              Wood-fired pizza, handmade pasta, and everything we&apos;d order ourselves.
              Kitchen open daily for lunch and dinner.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          {categories.map(([category, items]) => (
            <section key={category} className="mb-16 last:mb-0" data-reveal>
              <div className="flex items-center gap-4">
                <h2 className="font-serif text-title text-stone-900">{category}</h2>
                <span className="h-px flex-1 bg-stone-300" aria-hidden />
              </div>

              <div className="mt-8 grid gap-x-12 gap-y-7 md:grid-cols-2">
                {items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-serif text-lg font-medium text-stone-900">
                        {item.name}
                        {item.popular && (
                          <Star
                            className="ml-1.5 inline-block h-3.5 w-3.5 fill-primary text-primary align-baseline"
                            aria-label="Popular"
                          />
                        )}
                      </h3>
                      <span className="leader" aria-hidden />
                      <span className="text-sm font-semibold tabular-nums text-primary">
                        {item.price}
                      </span>
                    </div>
                    {item.desc && (
                      <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary">
          <div className="mx-auto max-w-4xl px-6 py-14 text-center">
            <p className="font-serif text-2xl italic text-white md:text-3xl">
              Save room for the tiramisu.
            </p>
            <Link
              href="/#reserve"
              className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
            >
              Book a table
            </Link>
          </div>
        </section>

        <footer className="border-t border-stone-200/70">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-10 text-center">
            <p className="text-sm text-stone-500">
              Prices in Philippine Pesos. Menu subject to availability.
            </p>
            <p className="text-sm text-stone-500">
              Reservations &amp; takeout:{" "}
              <a
                href={RESTAURANT.phoneHref}
                className="link-underline inline-flex items-center gap-1.5 font-semibold text-primary"
              >
                <Phone className="h-3.5 w-3.5" />
                {RESTAURANT.phone}
              </a>
            </p>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
}
