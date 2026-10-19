import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Transition from "@/components/Transition";
import QuickDock from "@/components/QuickDock";

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
    "Jagmount Projects (Jagwati Metals Engineering LLP) designs, fabricates and erects pre-engineered steel buildings, structural steel and industrial infrastructure from its 6000 MT plant in Palwal, Haryana.",
  openGraph: {
    title: "Jagmount Projects · Design to Completion",
    description: "Pre-engineered buildings, structural steel fabrication and industrial infrastructure. 6000 MT annual capacity, Palwal, Haryana.",
    images: ["/og.jpg"],
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#111214",
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
          <Cursor />
          <div className="grain" aria-hidden />
        </SmoothScroll>
      </body>
    </html>
  );
}
