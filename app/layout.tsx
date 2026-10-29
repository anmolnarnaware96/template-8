import "./globals.css";
import "aos/dist/aos.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const nacelle = localFont({
  src: [
    { path: "../public/nacelle-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/nacelle-italic.woff2", weight: "400", style: "italic" },
    { path: "../public/nacelle-semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/nacelle-semibolditalic.woff2", weight: "600", style: "italic" },
  ],
  variable: "--font-nacelle",
  display: "swap",
});

export const metadata = {
  title: "Open PRO",
  description: "Landing page template",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${nacelle.variable} bg-linear-to-b from-gray-950 via-brand-950 to-gray-950 bg-fixed font-inter text-base text-gray-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

