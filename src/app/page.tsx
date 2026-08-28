import RestaurantPage from "@/components/restaurant-page";

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
  return <RestaurantPage />;
}
