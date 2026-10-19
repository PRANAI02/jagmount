import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Transition from "@/components/Transition";
import QuickDock from "@/components/QuickDock";
import Analytics from "@/components/Analytics";

const archivo = localFont({
  variable: "--font-archivo",
  src: [{ path: "../fonts/archivo-var.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
});

const jet = localFont({
  variable: "--font-jet",
  src: [
    { path: "../fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jagmount.vercel.app"),
  title: {
    default: "Jagmount Projects · Pre-Engineered Buildings & Structural Steel",
    template: "%s · Jagmount Projects",
  },
  description:
    "Industrial steel buildings and structural steel fabrication. Jagmount Projects (Jagwati Metals Engineering LLP) designs, fabricates and erects pre-engineered buildings from its 6000 MT plant in Palwal, Haryana, and takes fabrication jobwork to drawings.",
  openGraph: {
    title: "Jagmount Projects · Design to Completion",
    description: "Pre-engineered buildings, structural steel fabrication and industrial infrastructure. 6000 MT annual capacity, Palwal, Haryana.",
    images: ["/og.jpg"],
    type: "website",
    locale: "en_IN",
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${jet.variable}`}>
      <body>
        <SmoothScroll>
          <Preloader />
          <Header />
          <Transition>
            <main id="main">{children}</main>
            <Footer />
          </Transition>
          <QuickDock />
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  );
}
