"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const MAX_ITEMS = 6;
const inputClasses =
  "w-full rounded-md border border-border bg-paper px-3 py-2 text-sm text-charcoal placeholder:text-muted focus:border-brand-600 focus:outline-none";
const labelClasses = "mb-1 block text-[11px] font-semibold uppercase tracking-wide text-muted";
const smallButton =
  "rounded-md border border-border px-2.5 py-1 text-xs text-ink hover:border-brand-600 hover:text-brand-600 disabled:opacity-40 disabled:hover:border-border disabled:hover:text-ink";

const newKey = () => `img-${Math.random().toString(36).slice(2, 10)}`;

// Editor for the homepage "Comunidad" gallery: up to 6 images, each with a
// description (alt text, ES/EN) and an optional link to the Instagram post.
// The whole list is saved at once, in the order shown.
export default function GalleryForm({ initialItems }) {
  const router = useRouter();
  const [items, setItems] = useState(() =>
    initialItems.map((i) => ({
      key: i._key,
      altEs: i.alt?.es || "",
      altEn: i.alt?.en || "",
      link: i.link || "",
      url: i.url,
      file: null,
      preview: null,
    }))
  );
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const addInput = useRef(null);
  const previews = useRef([]);

  // Local previews of chosen files; all released when the editor unmounts.
  function previewOf(file) {
    const url = URL.createObjectURL(file);
    previews.current.push(url);
    return url;
  }
  useEffect(() => () => previews.current.forEach((url) => URL.revokeObjectURL(url)), []);

  function update(key, patch) {
    setStatus("idle");
    setItems((list) => list.map((i) => (i.key === key ? { ...i, ...patch } : i)));
  }

  function addFiles(fileList) {
    setStatus("idle");
    const files = Array.from(fileList || []).slice(0, MAX_ITEMS - items.length);
    setItems((list) => [
      ...list,
      ...files.map((file) => ({
        key: newKey(),
        altEs: "",
        altEn: "",
        link: "",
        url: null,
        file,
        preview: previewOf(file),
      })),
    ]);
  }

  function replaceFile(key, file) {
    if (!file) return;
    update(key, { file, preview: previewOf(file) });
  }

  function move(index, delta) {
    setStatus("idle");
    setItems((list) => {
      const next = [...list];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item);
      return next;
    });
  }

  function remove(key) {
    setStatus("idle");
    setItems((list) => list.filter((i) => i.key !== key));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const formData = new FormData();
    formData.set(
      "items",
      JSON.stringify(items.map(({ key, altEs, altEn, link }) => ({ key, altEs, altEn, link })))
    );
    for (const item of items) if (item.file) formData.set(`file_${item.key}`, item.file);

    try {
      const res = await fetch("/api/admin/contenido/galeria", { method: "PUT", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo guardar la galería.");
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  }

  return (
    <Card className="mb-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-semibold text-charcoal">Galería — Comunidad (Inicio)</h2>
            <p className="mt-1 max-w-2xl text-sm text-muted">
              De 4 a 6 imágenes se ven mejor. Usa fotos verticales o cuadradas de buena resolución; el sitio las
              recorta para la composición. El enlace es opcional (p. ej. la publicación de Instagram).
            </p>
          </div>
          <div>
            <input
              ref={addInput}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={items.length >= MAX_ITEMS}
              onClick={() => addInput.current?.click()}
            >
              + Agregar imágenes
            </Button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted">
            Sin imágenes. Mientras la galería esté vacía, la sección se muestra solo con el texto.
          </p>
        ) : (
          <ol className="space-y-4">
            {items.map((item, index) => {
              const src = item.preview || (item.url ? `${item.url}?w=240&h=240&fit=crop&auto=format` : null);
              return (
                <li key={item.key} className="flex flex-col gap-4 rounded-lg border border-border p-4 md:flex-row">
                  <div className="flex shrink-0 flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-28 w-28 rounded-md bg-cream object-cover" />
                    <label className={`${smallButton} cursor-pointer`}>
                      Cambiar
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => replaceFile(item.key, e.target.files?.[0])}
                      />
                    </label>
                  </div>
                  <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <label className={labelClasses} htmlFor={`altEs-${item.key}`}>
                        Descripción (ES) — obligatoria
                      </label>
                      <input
                        id={`altEs-${item.key}`}
                        value={item.altEs}
                        onChange={(e) => update(item.key, { altEs: e.target.value })}
                        placeholder="Ej. Vista aérea de un macrolote en Querétaro"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label className={labelClasses} htmlFor={`altEn-${item.key}`}>
                        Descripción (EN)
                      </label>
                      <input
                        id={`altEn-${item.key}`}
                        value={item.altEn}
                        onChange={(e) => update(item.key, { altEn: e.target.value })}
                        placeholder="Si se deja vacía se usa la de español"
                        className={inputClasses}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClasses} htmlFor={`link-${item.key}`}>
                        Enlace a la publicación (opcional)
                      </label>
                      <input
                        id={`link-${item.key}`}
                        type="url"
                        value={item.link}
                        onChange={(e) => update(item.key, { link: e.target.value })}
                        placeholder="https://www.instagram.com/p/…"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div className="flex shrink-0 items-start gap-2 md:flex-col">
                    <button type="button" className={smallButton} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Subir">
                      ↑
                    </button>
                    <button
                      type="button"
                      className={smallButton}
                      disabled={index === items.length - 1}
                      onClick={() => move(index, 1)}
                      aria-label="Bajar"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-md border border-border px-2.5 py-1 text-xs text-muted hover:border-red-400 hover:text-red-600"
                      onClick={() => remove(item.key)}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        <div className="mt-6 flex items-center gap-4">
          <Button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Guardando..." : "Guardar galería"}
          </Button>
          {status === "saved" && <p className="text-sm text-brand-600">Galería guardada.</p>}
          {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}
        </div>
      </form>
    </Card>
  );
}
