import type { Metadata } from "next";
import { Fredoka, Inter, IBM_Plex_Mono } from "next/font/google";
import RevealInit from "@/components/reveal-init";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Giuseppe's — Italian Restaurant · Tacloban City",
  description: "Authentic Italian cucina on Avenida Veteranos, Tacloban. Wood-fired pizzas, handmade pasta, great cocktails. Open daily 11AM–10:30PM. Dogs welcome outside.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
