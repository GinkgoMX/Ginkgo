"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "./ui/icons";
import LeadModalButton from "./LeadModalButton";
import { buildWhatsappUrl, getContextualWhatsappMessage, GENERIC_MESSAGE } from "@/lib/whatsapp";

export default function FixedCTA({ whatsappNumber }) {
  const pathname = usePathname();
  const isSpanish = pathname.startsWith("/es");

  // Starts with the generic message so the button works immediately, then
  // swaps in the property/region-specific one once Sanity resolves it.
  const [message, setMessage] = useState(isSpanish ? GENERIC_MESSAGE.es : GENERIC_MESSAGE.en);

  useEffect(() => {
    let cancelled = false;
    getContextualWhatsappMessage(pathname).then((resolved) => {
      if (!cancelled) setMessage(resolved);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const whatsappUrl = buildWhatsappUrl(whatsappNumber, message);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <LeadModalButton size="sm" className="shadow-lg md:px-5 md:py-3 md:text-sm">
        {isSpanish ? "Solicitar información" : "Request Information"}
      </LeadModalButton>
    </div>
  );
}
