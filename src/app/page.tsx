import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Story from "@/components/story";
import MenuHighlights from "@/components/menu-highlights";
import Gallery from "@/components/gallery";
import ReviewQuote from "@/components/review-quote";
import Visit from "@/components/visit";
import Reserve from "@/components/reserve";
import PrivateDining from "@/components/private-dining";
import Perks from "@/components/perks";
import Footer from "@/components/footer";

export const revalidate = 60;

export const metadata = {
  title: "Giuseppe's — Italian Restaurant · Tacloban City",
  description: "Authentic Italian cucina on Avenida Veteranos, Tacloban. Wood-fired pizzas, handmade pasta, great cocktails. Open daily 11AM–10:30PM. Dogs welcome outside.",
  openGraph: {
    title: "Giuseppe's — Authentic Italian Cucina",
    description: "Wood-fired pizzas, handmade pasta, great cocktails on Avenida Veteranos, Tacloban City.",
    url: "https://giusseppe.vercel.app",
    siteName: "Giuseppe's",
    locale: "en_PH",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Story />
        <MenuHighlights />
        <Gallery />
        <ReviewQuote />
        <Visit />
        <Reserve />
        <PrivateDining />
        <Perks />
      </main>
      <Footer />
    </>
  );
}
