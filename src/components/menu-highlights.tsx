import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/section-header";
import { getMenu } from "@/lib/menu";
import { MENU, type MenuItem } from "@/lib/data";

const FEATURED: { name: string; photo: string; alt: string; fallback: MenuItem }[] = [
  {
    name: "Focaccia",
    photo: "/photos/dish-rosemary-flatbread.jpg",
    alt: "House-baked rosemary flatbread",
    fallback: {
      name: "Focaccia",
      price: "₱180",
      desc: "Warm house-baked flatbread, rosemary, olive oil",
    },
  },
  {
    name: "Hawaiian",
    photo: "/photos/1.jpg",
    alt: "Wood-fired Hawaiian pizza",
    fallback: {
      name: "Hawaiian",
      price: "₱480",
      desc: "Ham, pineapple, mozzarella, tomato sauce",
    },
  },
  {
    name: "Ribeye Steak",
    photo: "/photos/dish-steak-plate.jpg",
    alt: "Sliced ribeye steak with mash",
    fallback: {
      name: "Ribeye Steak",
      price: "₱980",
      desc: "USDA ribeye, peppercorn or mushroom sauce",
    },
  },
];

const ROW_NAMES = [
  "Bruschetta al Pomodoro",
  "Margherita",
  "Lasagna",
  "Cacio e Pepe",
  "Tiramisu",
];

function findItem(menu: Record<string, MenuItem[]>, name: string): MenuItem | undefined {
  for (const items of Object.values(menu)) {
    const hit = items.find((i) => i.name === name);
    if (hit) return hit;
  }
  return undefined;
}

export default async function MenuHighlights() {
  const menu = await getMenu();
  const fallbackFlat = Object.values(MENU).flat();
  const rowItems = ROW_NAMES.map(
    (name) => findItem(menu, name) ?? fallbackFlat.find((i) => i.name === name)
  ).filter(Boolean) as MenuItem[];

  return (
    <section id="highlights" className="border-y border-stone-200/70 bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="From the kitchen"
            title="Guests keep coming back for these"
            lede="Three signatures and a few old favorites — the full card runs a lot longer."
          />
          <Link
            href="/menu"
            className="link-underline shrink-0 pb-2 text-sm font-semibold text-primary"
            data-reveal
          >
            See the full menu →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {FEATURED.map((dish, i) => {
            const item = findItem(menu, dish.name) ?? dish.fallback;
            return (
              <article
                key={dish.name}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-stone-100">
                  <Image
                    src={dish.photo}
                    alt={dish.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <h3 className="font-serif text-xl font-semibold text-stone-900">{item.name}</h3>
                  <span className="leader" aria-hidden />
                  <span className="text-sm font-semibold text-primary">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.desc}</p>
              </article>
            );
          })}
        </div>

        <ul className="mt-14 max-w-2xl divide-y divide-stone-200/70 border-t border-stone-200/70" data-reveal>
          {rowItems.map((item) => (
            <li key={item.name} className="flex items-baseline py-4">
              <span className="font-serif text-lg text-stone-900">
                {item.name}
                {item.popular && (
                  <span className="ml-2 align-middle text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Popular
                  </span>
                )}
              </span>
              <span className="leader" aria-hidden />
              <span className="text-sm font-semibold text-stone-900">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
