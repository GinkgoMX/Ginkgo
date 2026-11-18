"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LeadFormD from "./LeadFormD";
import { LEAD_MODAL_HASHES, OPEN_LEAD_MODAL_EVENT } from "@/lib/leadModal";

const COPY = {
  es: {
    title: "Solicita información",
    subtitle: "Cuéntanos sobre tu proyecto y un asesor se pondrá en contacto contigo.",
    close: "Cerrar",
  },
  en: {
    title: "Request information",
    subtitle: "Tell us about your project and an advisor will be in touch with you.",
    close: "Close",
  },
};

const CLOSE_ANIMATION_MS = 180;

// Site-wide "Solicitar información" modal, built on the native <dialog>:
// showModal() makes the rest of the page inert (focus stays inside the
// dialog), Esc closes it, and the browser returns focus to the button that
// opened it. Opened by LeadModalButton (a window event) or by arriving on a
// URL with #solicitar-informacion / #request-information.
export default function LeadModal({ locale = "es", title, subtitle }) {
  const t = COPY[locale] ?? COPY.es;
  // Title and subtitle are editable in /admin/contenido (Inicio — Portada).
  const heading = title || t.title;
  const lead = subtitle || t.subtitle;
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const closeTimer = useRef(null);
  const pathname = usePathname();
  const [submitted, setSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    clearTimeout(closeTimer.current);
    delete dialog.dataset.closing;
    dialog.showModal();
    document.documentElement.classList.add("modal-open");
    // Focus the title rather than the first field: screen readers announce
    // what opened, and phones don't throw the keyboard up immediately.
    titleRef.current?.focus();
  }, []);

  const close = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    dialog.dataset.closing = "true";
    closeTimer.current = setTimeout(() => {
      delete dialog.dataset.closing;
      dialog.close();
    }, reduceMotion ? 0 : CLOSE_ANIMATION_MS);
  }, []);

  // Runs for every way the dialog ends up closed.
  const handleClosed = useCallback(() => {
    document.documentElement.classList.remove("modal-open");
    if (LEAD_MODAL_HASHES.includes(window.location.hash)) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    // After a successful send, the next open starts with a fresh form; an
    // accidental close mid-typing keeps what was written.
    if (submitted) {
      setSubmitted(false);
      setFormKey((k) => k + 1);
    }
  }, [submitted]);

  useEffect(() => {
    const openFromHash = () => {
      if (LEAD_MODAL_HASHES.includes(window.location.hash)) open();
    };
    window.addEventListener(OPEN_LEAD_MODAL_EVENT, open);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      window.removeEventListener(OPEN_LEAD_MODAL_EVENT, open);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [open]);

  // Navigating to another page closes it. Only on an actual change: on first
  // load this would close a modal the URL hash had just opened.
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
  }, [pathname]);

  useEffect(() => () => {
    clearTimeout(closeTimer.current);
    document.documentElement.classList.remove("modal-open");
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="lead-modal"
      aria-labelledby="lead-modal-title"
      aria-describedby="lead-modal-subtitle"
      onCancel={(e) => {
        // Esc: run the closing animation instead of vanishing.
        e.preventDefault();
        close();
      }}
      onClose={handleClosed}
      onClick={(e) => {
        // The dialog box itself has no padding, so a click whose target is
        // the <dialog> element landed on the backdrop.
        if (e.target === dialogRef.current) close();
      }}
    >
      <div className="relative px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9">
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-border sm:hidden" aria-hidden="true" />
        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-charcoal md:right-5 md:top-5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <span className="block h-[2px] w-8 bg-gold" aria-hidden="true" />
        <h2
          id="lead-modal-title"
          ref={titleRef}
          tabIndex={-1}
          className="mt-4 pr-10 font-serif text-2xl font-semibold leading-tight text-charcoal focus:outline-none md:text-3xl"
        >
          {heading}
        </h2>
        <p id="lead-modal-subtitle" className="mt-2 text-ink">
          {lead}
        </p>

        <div className="mt-6 border-t border-border pt-6 md:mt-8 md:pt-8">
          <LeadFormD key={formKey} locale={locale} id="lead-modal" onSuccess={() => setSubmitted(true)} />
        </div>
      </div>
    </dialog>
  );
}
