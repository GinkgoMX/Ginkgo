"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for the whole site, so server components can opt into the
// scroll reveal with a plain attribute instead of becoming client components:
//   data-reveal          — the element rises in when it enters view
//   data-reveal-stagger  — each direct child rises in as it enters view; the
//                          ones that arrive together cascade 90 ms apart
// The visual side lives in app/globals.css (only active under html.js, and
// switched off for prefers-reduced-motion).
const TARGETS =
  "[data-reveal]:not([data-revealed]), [data-reveal-stagger] > :not([data-revealed])";
const STEP_MS = 90;
const MAX_STEPS = 5;

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el) => el.setAttribute("data-revealed", "");

    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(TARGETS).forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Entries arrive in DOM order; everything that came into view in the
        // same frame forms one cascade (e.g. a row of cards).
        let step = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          if (el.parentElement?.hasAttribute("data-reveal-stagger")) {
            el.style.setProperty("--reveal-delay", `${Math.min(step, MAX_STEPS) * STEP_MS}ms`);
            step += 1;
          }
          reveal(el);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
    );

    const observeAll = () => document.querySelectorAll(TARGETS).forEach((el) => observer.observe(el));
    observeAll();

    // Client-side navigations and streamed content add nodes after mount.
    let queued = false;
    const mutations = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        observeAll();
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
