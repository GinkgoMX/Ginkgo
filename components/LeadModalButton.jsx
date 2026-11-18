"use client";

import { buttonClasses } from "./ui/Button";
import { openLeadModal } from "@/lib/leadModal";

// Any "Solicitar información" call to action. Opens the site-wide modal
// (components/LeadModal.jsx, mounted once per language layout).
export default function LeadModalButton({ variant = "primary", size = "md", className = "", children }) {
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={openLeadModal}
      className={buttonClasses({ variant, size, className })}
    >
      {children}
    </button>
  );
}
