import type { Metadata } from "next";
import { Montserrat, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const cosiAzure = localFont({
  src: [
    {
      path: "../../public/fonts/CosiAzure-Black.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CosiAzure-Black.woff", // Add the WOFF source
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-cosi-azure",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Solde",
  description: "Take control of your spending",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          montserrat.variable,
          ebGaramond.variable,
          cosiAzure.variable,
          "font-sans",
        )}
      >
        {children}
      </body>
    </html>
  );
}
