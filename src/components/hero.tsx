import Image from "next/image";
import Link from "next/link";
import { getHours } from "@/lib/site";

export default async function Hero() {
  const hours = await getHours();
  const monday = hours.Monday;
  const friday = hours.Friday;
  const hoursLabel =
    monday?.open && (friday?.close2 || friday?.close)
      ? `${monday.open.replace(":00", "")} – ${(friday.close2 || friday.close).replace(":00", "")}`
      : "11 AM – late";

  return (
    <section className="grid border-b border-line lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col justify-center px-6 py-20 sm:px-10 lg:min-h-[calc(100svh-5rem)] lg:py-28 lg:pl-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] lg:pr-16">
        <p className="eyebrow text-stone-400">Cucina Italiana · Tacloban City</p>

        <h1 className="mt-6 font-serif text-[clamp(2.5rem,4.8vw,4.25rem)] leading-[1.0] tracking-[-0.02em] text-foreground">
          Wood-fired pizza, handmade pasta,{" "}
          <em className="italic text-primary">and a warm Leyte welcome.</em>
        </h1>

        <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted">
          An Italian osteria on Avenida Veteranos — dough proofed slowly and fired in the wood
          oven, pasta rolled by hand, and cocktails poured till late.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#reserve"
            className="bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            Reserve a table
          </a>
          <Link href="/menu" className="link-underline text-sm font-medium text-foreground">
            See the menu →
          </Link>
        </div>

        <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-6">
          <div>
            <dt className="eyebrow text-stone-400">Open daily</dt>
            <dd className="mt-2 font-serif text-lg text-foreground">{hoursLabel}</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-400">The kitchen</dt>
            <dd className="mt-2 font-serif text-lg text-foreground">Wood-fired</dd>
          </div>
          <div>
            <dt className="eyebrow text-stone-400">Find us</dt>
            <dd className="mt-2 font-serif text-lg text-foreground">Avenida Veteranos</dd>
          </div>
        </dl>
      </div>

      <div className="relative min-h-[52svh] border-line lg:min-h-0 lg:border-l">
        <Image
          src="/photos/hero.jpg"
          alt="The dining room at Giuseppe's, Tacloban City"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
