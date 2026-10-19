import type { Metadata } from "next";
import QuotePage from "@/components/QuotePage";

export const metadata: Metadata = {
  title: "Request Fabrication Pricing",
  description: "Send your drawings for a structural steel fabrication quote: built-up beams, columns, rafters, crane beams and platforms, fabricated at our Palwal plant.",
  alternates: { canonical: "/quote/fabrication" },
};

export default function Page() {
  return <QuotePage kind="fabrication" />;
}
