import { DEFAULT_REVIEWS } from "@/lib/data";
import { getRestaurant } from "@/lib/site";

const quote = DEFAULT_REVIEWS[0];

export default async function ReviewQuote() {
  const r = await getRestaurant();

  return (
    <section className="px-3 py-3 sm:px-5">
      <div className="mx-auto max-w-[1400px] rounded-[2.5rem] bg-primary">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
          <p className="eyebrow text-white/55" data-reveal>
            From the guest book
          </p>

          <div className="mt-6 flex justify-center gap-1.5 text-accent" aria-hidden data-reveal>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm">
                ★
              </span>
            ))}
          </div>

          <blockquote
            className="mt-8 font-serif text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.15] text-white"
            data-reveal
            style={{ transitionDelay: "80ms" }}
          >
            &ldquo;{quote.text}&rdquo;
          </blockquote>

          <div className="mt-10" data-reveal style={{ transitionDelay: "160ms" }}>
            <p className="eyebrow text-white/55">
              {quote.name} · Google · {r.rating} from {r.reviewCount} reviews
            </p>
            <a
              href={r.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Read the reviews on Google →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
