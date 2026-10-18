import Link from "next/link";
import { Metadata } from "next";
import { Phone, Star } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getMenu } from "@/lib/menu";
import { getRestaurant } from "@/lib/site";

export const revalidate = 60;

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export async function generateMetadata(): Promise<Metadata> {
  const r = await getRestaurant();
  return {
    title: `Menu — ${r.name}`,
    description: `View the full menu at ${r.name}. Wood-fired pizzas, handmade pasta, grilled meats, and more. Authentic Italian in Tacloban City.`,
    openGraph: {
      title: `Menu — ${r.name}`,
      description: `Wood-fired pizzas, handmade pasta, grilled meats, and more.`,
      url: "https://giusseppe.vercel.app/menu",
      siteName: r.name,
      locale: "en_PH",
      type: "website",
    },
  };
}

export default async function MenuPage() {
  const [menu, r] = await Promise.all([getMenu(), getRestaurant()]);
  const categories = Object.entries(menu).filter(([, items]) => items.length > 0);

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <header className="px-3 pt-3 sm:px-5">
          <div className="mx-auto max-w-[1240px] rounded-[2.5rem] bg-surface px-6 py-16 sm:px-12 md:py-24">
            <p className="eyebrow text-stone-500">{r.name} / The menu</p>
            <h1 className="mt-4 font-serif text-display text-foreground">The menu</h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
              Wood-fired pizza, handmade pasta, and everything we&apos;d order ourselves. Kitchen
              open daily for lunch and dinner.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          {categories.map(([category, items], ci) => (
            <section key={category} className="mb-16 last:mb-0" data-reveal>
              <div className="flex items-baseline gap-3 border-b border-line pb-4">
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-[11px] font-semibold text-background">
                  {ROMAN[ci] ?? ci + 1}
                </span>
                <h2 className="font-serif text-3xl text-foreground">{category}</h2>
              </div>

              <div className="grid gap-x-14 md:grid-cols-2">
                {items.map((item) => (
                  <div key={item.name} className="border-b border-line/60 py-5">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-serif text-lg text-foreground">
                        {item.name}
                        {item.popular && (
                          <Star
                            className="ml-1.5 inline-block h-3.5 w-3.5 fill-accent align-baseline text-accent"
                            aria-label="Popular"
                          />
                        )}
                      </h3>
                      <span className="leader" aria-hidden />
                      <span className="text-sm font-medium tabular-nums text-primary">
                        {item.price}
                      </span>
                    </div>
                    {item.desc && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="px-3 pb-3 sm:px-5">
          <div className="mx-auto max-w-[1400px] rounded-[2.5rem] bg-primary">
            <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
              <p className="eyebrow text-white/60">From the pastry counter</p>
              <p className="mt-4 font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] text-white">
                Save room for the tiramisu.
              </p>
              <Link
                href="/#reserve"
                className="mt-8 inline-block rounded-full bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Book a table
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 py-12 text-center">
            <p className="eyebrow text-stone-400">
              Prices in Philippine Pesos · Menu subject to availability
            </p>
            <p className="text-sm text-muted">
              Reservations &amp; takeout:{" "}
              <a
                href={r.phoneHref}
                className="link-underline inline-flex items-center gap-1.5 font-medium text-primary"
              >
                <Phone className="h-3.5 w-3.5" />
                {r.phone}
              </a>
            </p>
          </div>
        </footer>
      </main>
      <Footer />
    </>
  );
}
