"use client";

import Lightbox from "./Lightbox";

/** Small "completion certificate" link that opens the certificate full screen. */
export default function CertThumb({ src, name }: { src: string; name: string }) {
  return (
    <Lightbox
      items={[{ src, cap: "Completion certificate", sub: name }]}
      className=""
      tileClass="!w-auto !bg-transparent"
      contain
      render={() => <span className="mono border border-[var(--line-strong)] px-2.5 py-1.5 text-[10px] hover:border-orange hover:text-orange">View certificate</span>}
    />
  );
}
