import { DEFAULT_REVIEWS } from "@/lib/data";
import { getRestaurant } from "@/lib/site";

const quote = DEFAULT_REVIEWS[0];

export default async function ReviewQuote() {
  const r = await getRestaurant();

  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <div className="flex justify-center gap-1 text-accent" aria-hidden data-reveal>
          {"★★★★★".split("").map((star, i) => (
            <span key={i} className="text-lg">
              {star}
            </span>
          ))}
        </div>

        <blockquote
          className="mt-8 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-snug text-white"
          data-reveal
          style={{ transitionDelay: "80ms" }}
        >
          &ldquo;{quote.text}&rdquo;
        </blockquote>

        <div className="mt-8 flex flex-col items-center gap-2" data-reveal style={{ transitionDelay: "160ms" }}>
          <p className="text-sm font-semibold text-white">{quote.name}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-white/60">
            Google review · {r.rating} from {r.reviewCount}
          </p>
          <a
            href={r.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-3 text-sm font-semibold text-white"
          >
            Read the reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
