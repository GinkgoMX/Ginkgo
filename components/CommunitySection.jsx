import Image from "next/image";
import Button from "./ui/Button";
import Eyebrow from "./ui/Eyebrow";
import { TITLE_CLASSES } from "./ui/SectionHeader";
import { getSiteText } from "@/lib/siteContent";
import { getContactSettings } from "@/lib/siteSettings";
import { getCommunityGallery } from "@/lib/sanity/queries";

const COPY = {
  es: { insightsHref: "/es/insights", viewPost: "Ver publicación", opensNew: "se abre en una pestaña nueva" },
  en: { insightsHref: "/en/insights", viewPost: "View post", opensNew: "opens in a new tab" },
};

// Two staggered columns; within each, tall and square frames alternate in
// opposite order so the gallery reads as an editorial spread, not a grid.
const ASPECTS = {
  left: ["aspect-[4/5]", "aspect-square"],
  right: ["aspect-square", "aspect-[4/5]"],
};

function GalleryImage({ item, aspect, locale }) {
  const t = COPY[locale];
  const alt = item.alt?.[locale] || item.alt?.es || "";
  const frame = (
    <div className={`media-zoom relative overflow-hidden rounded-lg bg-brand-50 ${aspect}`}>
      <Image
        src={item.url}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 340px, (min-width: 1024px) 28vw, 50vw"
        placeholder={item.lqip ? "blur" : "empty"}
        blurDataURL={item.lqip || undefined}
        className="object-cover"
      />
      {item.link && (
        <>
          <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 ease-out-expo group-hover:bg-charcoal/45 group-focus-visible:bg-charcoal/45" />
          <span className="absolute bottom-5 left-5 flex translate-y-2 items-center gap-2 font-serif text-[11px] font-semibold uppercase tracking-[0.22em] text-white opacity-0 transition-all duration-700 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {t.viewPost}
            <span aria-hidden="true">↗</span>
          </span>
        </>
      )}
    </div>
  );

  if (!item.link) return frame;
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.viewPost}: ${alt} (${t.opensNew})`}
      className="group block rounded-lg"
    >
      {frame}
    </a>
  );
}

// Homepage "Comunidad" section: brand statement on the left, a curated image
// gallery on the right. Texts come from Contenido del sitio (home.community.*),
// images from the gallery editor on the same admin page, the Instagram link
// from Configuración. With no images saved yet it renders as a centered
// statement instead of showing empty frames.
export default async function CommunitySection({ locale = "es" }) {
  const t = COPY[locale] ?? COPY.es;
  const [text, gallery, { instagramUrl }] = await Promise.all([
    getSiteText(),
    getCommunityGallery(),
    getContactSettings(),
  ]);
  const hasGallery = gallery.length > 0;
  const left = gallery.filter((_, i) => i % 2 === 0);
  const right = gallery.filter((_, i) => i % 2 === 1);

  const intro = (
    <div data-reveal className={hasGallery ? "lg:sticky lg:top-32" : "mx-auto max-w-2xl text-center"}>
      <Eyebrow className={hasGallery ? "" : "justify-center"}>{text("home.community.eyebrow", locale)}</Eyebrow>
      <h2 className={`${TITLE_CLASSES.h2} mt-5`}>{text("home.community.title", locale)}</h2>
      <p className={`mt-6 max-w-md text-base leading-[1.8] text-ink md:text-lg ${hasGallery ? "" : "mx-auto"}`}>
        {text("home.community.text", locale)}
      </p>
      <div className={`mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 ${hasGallery ? "" : "justify-center"}`}>
        <Button href={t.insightsHref}>{text("home.community.button", locale)}</Button>
        {instagramUrl && (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-draw font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600"
          >
            {text("home.community.instagram", locale)}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section className="bg-[linear-gradient(180deg,#FCFBF8_0%,#F5F2EC_100%)] px-6 py-24 md:px-10 md:py-40">
      {hasGallery ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">{intro}</div>
          <div className={`grid gap-4 md:gap-6 lg:col-span-7 ${right.length > 0 ? "grid-cols-2" : "grid-cols-1"}`}>
            <div data-reveal-stagger className="flex flex-col gap-4 md:gap-6">
              {left.map((item, i) => (
                <GalleryImage key={item._key} item={item} aspect={ASPECTS.left[i % 2]} locale={locale} />
              ))}
            </div>
            {right.length > 0 && (
              <div data-reveal-stagger className="flex flex-col gap-4 pt-16 md:gap-6 md:pt-28">
                {right.map((item, i) => (
                  <GalleryImage key={item._key} item={item} aspect={ASPECTS.right[i % 2]} locale={locale} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        intro
      )}
    </section>
  );
}
