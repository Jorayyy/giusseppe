import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[calc(100svh-4rem)] max-h-[860px] min-h-[540px] w-full overflow-hidden bg-stone-900">
      <Image
        src="/photos/hero.jpg"
        alt="The dining room at Giuseppe's, Tacloban City"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1200px] px-6 pb-14 md:pb-20">
        <p className="eyebrow text-white/75">Giuseppe&apos;s · Avenida Veteranos · Tacloban City</p>
        <h1 className="mt-4 max-w-3xl font-serif text-display text-white">
          Wood-fired pizza, handmade pasta, Tacloban.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
          An Italian cucina with a Leyte welcome — wood-fired oven, fresh pasta, and cocktails
          till late. Open daily.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#reserve"
            className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
          >
            Reserve a table
          </a>
          <Link
            href="/menu"
            className="rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
