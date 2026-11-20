import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

// Renders next/image when the referenced file actually exists under /public,
// otherwise falls back to a designed placeholder instead of a broken-image
// icon. Once real photography is dropped into /public at the same path,
// this starts rendering it automatically — no code changes needed.
export default function Photo({
  src,
  alt,
  className = "",
  imgClassName = "",
  fill = true,
  width,
  height,
  priority = false,
  sizes,
  // "light" (pale brand gradient) or "dark" (navy with contour lines, used
  // on cards and heroes so a missing photo still looks deliberate).
  fallback = "light",
}) {
  const isRemote = typeof src === "string" && /^https?:\/\//.test(src);
  const exists =
    isRemote || (Boolean(src) && fs.existsSync(path.join(process.cwd(), "public", src)));

  if (!exists && fallback === "dark") {
    return (
      <div className={`media-fallback flex items-end ${className}`} role="img" aria-label={alt}>
        <span className="m-6 font-serif text-[10px] font-semibold uppercase tracking-[0.4em] text-white/35">Ginkgo</span>
      </div>
    );
  }

  if (!exists) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-brand-100 via-cream to-brand-50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-serif text-sm uppercase tracking-[0.3em] text-brand-600/50">Ginkgo</span>
      </div>
    );
  }

  if (fill) {
    // The wrapper must be positioned for next/image's `fill`. Only add
    // `relative` when the caller hasn't positioned it already: Tailwind emits
    // `.relative` after `.absolute`, so "relative absolute inset-0" resolved
    // to relative, the wrapper collapsed to 0px tall, and every detail-page
    // hero (opportunities, regions, insights) rendered with no photo.
    const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
    return (
      <div className={`${positioned ? "" : "relative"} overflow-hidden ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={imgClassName}
    />
  );
}
