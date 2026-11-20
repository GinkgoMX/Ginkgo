import Link from "next/link";
import Photo from "./ui/Photo";

const COPY = {
  es: { surface: "Superficie", vocation: "Vocación", cta: "Conocer la oportunidad", href: (slug) => `/es/oportunidades/${slug}` },
  en: { surface: "Surface", vocation: "Land use", cta: "View opportunity", href: (slug) => `/en/opportunities/${slug}` },
};

// One property card for the homepage portfolio and the Oportunidades list, so
// both stay identical. Expects a legacy-shaped opportunity (toLegacyOpportunity).
//
// Image-led, editorial layout: the whole card is the link; the photo carries
// the location and a catalogue number; the facts sit in a quiet spec row.
// Properties without photography get the navy contour placeholder, so a
// portfolio that is mostly unphotographed still reads as deliberate.
export default function OpportunityCard({ op, locale = "es", showAdvantages = false, index }) {
  const t = COPY[locale] ?? COPY.es;
  const name = op[`name_${locale}`];
  const place = op[`city_${locale}`] || op[`regionName_${locale}`];
  const brief = op[`briefDescription_${locale}`];
  const vocation = op[`vocation_${locale}`];
  const advantages = showAdvantages ? (op[`advantages_${locale}`] || []).slice(0, 2) : [];

  return (
    <Link
      href={t.href(op.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper ring-1 ring-border transition-[box-shadow,transform] duration-700 ease-out-expo hover:-translate-y-1 hover:shadow-[0_32px_64px_-32px_rgb(12_26_47/0.4)]"
    >
      <div className="media-zoom relative aspect-[4/3] overflow-hidden">
        <Photo
          src={op.image}
          alt={name}
          fallback="dark"
          className="absolute inset-0"
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-charcoal/10" />
        {place && (
          <span className="absolute left-5 top-5 rounded-full bg-white/12 px-3 py-1.5 font-serif text-[10px] font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur-md">
            {place}
          </span>
        )}
        {typeof index === "number" && (
          <span className="absolute bottom-4 right-5 font-display text-lg italic text-white/80">
            N° {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-[1.7rem] font-medium leading-[1.12] tracking-[-0.01em] text-charcoal transition-colors duration-500 group-hover:text-brand-600">
          {name}
        </h3>
        {brief && <p className="mt-3 line-clamp-3 text-sm leading-[1.75] text-ink">{brief}</p>}

        {(op.surface || vocation) && (
          <dl className="mt-6 grid grid-cols-2 divide-x divide-border border-y border-border">
            {op.surface && (
              <div className="py-4 pr-4">
                <dt className="font-serif text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{t.surface}</dt>
                <dd className="mt-1 font-display text-xl font-medium text-charcoal">{op.surface}</dd>
              </div>
            )}
            {vocation && (
              <div className={op.surface ? "py-4 pl-4" : "py-4 pr-4"}>
                <dt className="font-serif text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">{t.vocation}</dt>
                <dd className="mt-1 font-display text-xl font-medium leading-snug text-charcoal">{vocation}</dd>
              </div>
            )}
          </dl>
        )}

        {advantages.length > 0 && (
          <ul className="mt-5 space-y-2 text-sm leading-relaxed text-ink">
            {advantages.map((adv) => (
              <li key={adv} className="flex gap-3">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" aria-hidden="true" />
                {adv}
              </li>
            ))}
          </ul>
        )}

        {/* mt-auto pins the link to the bottom so a row of cards lines up. */}
        <div className="mt-auto pt-7">
          <span className="link-arrow inline-flex items-center gap-2 font-serif text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-600">
            {t.cta}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
