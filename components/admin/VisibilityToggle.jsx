"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// One-click "show on the public site / hide from it" switch for the
// Propiedades and Regiones lists. PATCHes { visible } to `endpoint`.
export default function VisibilityToggle({ endpoint, visible, label }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visible: !visible }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo cambiar la visibilidad.");
      }
      router.refresh();
    } catch (error) {
      window.alert(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={visible}
      aria-label={`${visible ? "Ocultar" : "Mostrar"} ${label || ""} en el sitio`.trim()}
      title={visible ? "Visible en el sitio — clic para ocultar" : "Oculta — clic para mostrar en el sitio"}
      onClick={handleClick}
      disabled={busy}
      className="inline-flex items-center gap-2 text-sm disabled:opacity-50"
    >
      <span
        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors ${
          visible ? "bg-brand-600" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            visible ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
      <span className={visible ? "text-charcoal" : "text-muted"}>{busy ? "..." : visible ? "Visible" : "Oculta"}</span>
    </button>
  );
}
