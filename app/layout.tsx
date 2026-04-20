import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Öhmans Design & Snickeri",
  description:
    "Platsbyggda möbler och skräddarsydda inredningslösningar med känsla för detaljer. Kontakta oss för offert.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-stone-950 text-stone-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}