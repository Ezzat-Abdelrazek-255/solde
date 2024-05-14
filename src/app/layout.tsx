import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import ExpensesProvider from "@/components/providers/ExpensesProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import BudgetsProvider from "@/components/providers/BudgetProvider";

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
const garmond = localFont({
  src: [
    {
      path: "../../public/fonts/Garmond-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Garmond-Regular.woff", // Add the WOFF source
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Garmond-Bold.woff2", // Add the WOFF source
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Garmond-Bold.woff", // Add the WOFF source
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-garmond",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
          garmond.variable,
          cosiAzure.variable,
          "font-sans text-neutral-10",
        )}
      >
        <AuthProvider>
          <ExpensesProvider>
            <BudgetsProvider>{children}</BudgetsProvider>
          </ExpensesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
