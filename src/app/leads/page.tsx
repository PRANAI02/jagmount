import type { Metadata } from "next";
import LeadTracker from "@/components/LeadTracker";

export const metadata: Metadata = { title: "Lead tracker", robots: { index: false, follow: false } };

export default function Page() {
  return <LeadTracker />;
}
