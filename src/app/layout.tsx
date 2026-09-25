import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { MotionProvider } from "@/components/Motion";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "КСС, актове и оферти за строителни фирми — готови до 48 часа | Стройдокс",
    template: "%s | Стройдокс",
  },
  description:
    "Изготвяне на КСС, актове по Наредба №3 и документален офис за строителни фирми в София. Оферта до 2 часа, готов документ до 48 часа.",
};

export const viewport: Viewport = {
  themeColor: "#0b1b2e",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bg" className={`${manrope.variable} ${playfair.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">
        <MotionProvider />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingChat />
      </body>
    </html>
  );
}
