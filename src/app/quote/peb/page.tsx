import type { Metadata } from "next";
import QuotePage from "@/components/QuotePage";

export const metadata: Metadata = {
  title: "Get a PEB Quote",
  description: "Tell us about your factory, warehouse or industrial building project and get a budgetary quote for a pre-engineered building from Jagmount Projects.",
  alternates: { canonical: "/quote/peb" },
};

export default function Page() {
  return <QuotePage kind="peb" />;
}
