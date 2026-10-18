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
    <section id="highlights" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1240px] px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            index="II"
            eyebrow="From the kitchen"
            title="Guests keep coming back for these"
            lede="Three signatures and a few old favorites — the full card runs a lot longer."
          />
          <Link
            href="/menu"
            className="link-underline shrink-0 pb-2 text-sm font-medium text-primary"
            data-reveal
          >
            See the full menu →
          </Link>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {FEATURED.map((dish, i) => {
            const item = findItem(menu, dish.name) ?? dish.fallback;
            return (
              <article
                key={dish.name}
                data-reveal
                style={{ transitionDelay: `${i * 90}ms` }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface-dark">
                  <Image
                    src={dish.photo}
                    alt={dish.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-3">
                  <h3 className="font-serif text-2xl text-foreground">{item.name}</h3>
                  <span className="leader" aria-hidden />
                  <span className="text-sm font-medium text-primary">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </article>
            );
          })}
        </div>

        <ul
          className="mt-16 max-w-2xl divide-y divide-line border-y border-line"
          data-reveal
        >
          {rowItems.map((item) => (
            <li key={item.name} className="flex items-baseline py-4">
              <span className="font-mono text-[13px] text-foreground">
                {item.name}
                {item.popular && (
                  <span className="eyebrow ml-3 align-middle text-accent">Popular</span>
                )}
              </span>
              <span className="leader" aria-hidden />
              <span className="font-mono text-[13px] text-primary">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
