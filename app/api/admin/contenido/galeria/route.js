import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireApiRole } from "@/lib/auth/requireApiRole";
import { ROLES } from "@/lib/auth/roles";
import { logActivity } from "@/lib/activityLog";
import { sanityWriteClient } from "@/lib/sanity/writeClient";
import { CONTENT_DOC_ID } from "@/lib/siteContent";

const MAX_ITEMS = 6;
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const KEY_PATTERN = /^[A-Za-z0-9-]{1,40}$/;

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Saves the whole homepage "Comunidad" gallery in one go, in display order.
// multipart/form-data:
//   items         JSON [{ key, altEs, altEn, link }] — the final list, in order
//   file_<key>    an image for that item (required for new items; replaces
//                 the current image for existing ones)
// Items left out of `items` are removed from the gallery.
export async function PUT(request) {
  const auth = await requireApiRole([ROLES.ADMIN, ROLES.ASSISTANT]);
  if (auth.error) return auth.error;

  let formData;
  let items;
  try {
    formData = await request.formData();
    items = JSON.parse(formData.get("items")?.toString() || "[]");
  } catch {
    return badRequest("Datos inválidos.");
  }
  if (!Array.isArray(items)) return badRequest("Datos inválidos.");
  if (items.length > MAX_ITEMS) return badRequest(`La galería admite como máximo ${MAX_ITEMS} imágenes.`);

  const current =
    (await sanityWriteClient.fetch(`*[_id == $id][0].communityGallery`, { id: CONTENT_DOC_ID })) || [];
  const currentByKey = Object.fromEntries(current.map((entry) => [entry._key, entry]));

  // Validate everything before uploading anything.
  const seen = new Set();
  for (const [index, item] of items.entries()) {
    const position = index + 1;
    if (!KEY_PATTERN.test(item?.key || "") || seen.has(item.key)) return badRequest("Datos inválidos.");
    seen.add(item.key);
    if (!item.altEs?.trim()) return badRequest(`Imagen ${position}: falta la descripción en español.`);
    if (item.link?.trim()) {
      let url;
      try {
        url = new URL(item.link.trim());
      } catch {
        return badRequest(`Imagen ${position}: el enlace no es una URL válida.`);
      }
      if (url.protocol !== "https:") return badRequest(`Imagen ${position}: el enlace debe empezar con https://`);
    }
    const file = formData.get(`file_${item.key}`);
    const hasFile = file instanceof File && file.size > 0;
    if (hasFile) {
      if (!file.type.startsWith("image/")) return badRequest(`Imagen ${position}: el archivo no es una imagen.`);
      if (file.size > MAX_FILE_BYTES) return badRequest(`Imagen ${position}: el archivo pesa más de 10 MB.`);
    } else if (!currentByKey[item.key]?.image?.asset) {
      return badRequest(`Imagen ${position}: falta subir el archivo.`);
    }
  }

  const gallery = [];
  for (const item of items) {
    const file = formData.get(`file_${item.key}`);
    let image = currentByKey[item.key]?.image;
    if (file instanceof File && file.size > 0) {
      const asset = await sanityWriteClient.assets.upload("image", file, { filename: file.name });
      image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
    }
    const altEs = item.altEs.trim();
    gallery.push({
      _key: item.key,
      _type: "communityImage",
      image,
      alt: { es: altEs, en: item.altEn?.trim() || altEs },
      ...(item.link?.trim() ? { link: item.link.trim() } : {}),
    });
  }

  await sanityWriteClient
    .transaction()
    .createIfNotExists({ _id: CONTENT_DOC_ID, _type: "siteContent" })
    .patch(CONTENT_DOC_ID, (p) => p.set({ communityGallery: gallery }))
    .commit();

  await logActivity(auth.session, "update", {
    type: "siteContent",
    id: CONTENT_DOC_ID,
    label: "Galería — Comunidad",
  });
  revalidatePath("/es");
  revalidatePath("/en");

  return NextResponse.json({ ok: true, count: gallery.length });
}
