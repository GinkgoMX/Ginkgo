import Photo from "./ui/Photo";
import Button from "./ui/Button";
import Card from "./ui/Card";

const COPY = {
  es: { surface: "Superficie", vocation: "Vocación", cta: "Conocer la oportunidad", href: (slug) => `/es/oportunidades/${slug}` },
  en: { surface: "Surface", vocation: "Land use", cta: "View opportunity", href: (slug) => `/en/opportunities/${slug}` },
};

// One property card for the homepage portfolio and the Oportunidades list, so
// both stay identical. Expects a legacy-shaped opportunity (toLegacyOpportunity).
export default function OpportunityCard({ op, locale = "es", showAdvantages = false }) {
  const t = COPY[locale] ?? COPY.es;
  const name = op[`name_${locale}`];
  const city = op[`city_${locale}`];
  const brief = op[`briefDescription_${locale}`];
  const vocation = op[`vocation_${locale}`];
  const advantages = showAdvantages ? (op[`advantages_${locale}`] || []).slice(0, 2) : [];

  return (
    <Card padded={false} className="flex flex-col overflow-hidden">
      <Photo src={op.image} alt={name} className="h-52 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-semibold leading-snug text-charcoal">{name}</h3>
        {city && <p className="mt-1 text-sm text-muted">{city}</p>}
        {brief && <p className="mt-3 text-sm leading-relaxed text-ink">{brief}</p>}

        {(op.surface || vocation) && (
          <dl className="mt-4 grid grid-cols-2 gap-x-4 border-t border-border pt-4 text-sm">
            {op.surface && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">{t.surface}</dt>
                <dd className="mt-0.5 font-medium text-charcoal">{op.surface}</dd>
              </div>
            )}
            {vocation && (
              <div>
                <dt className="text-xs uppercase tracking-wide text-muted">{t.vocation}</dt>
                <dd className="mt-0.5 font-medium text-charcoal">{vocation}</dd>
              </div>
            )}
          </dl>
        )}

        {advantages.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-ink">
            {advantages.map((adv) => (
              <li key={adv} className="flex gap-2">
                <span className="text-brand-600">—</span>
                {adv}
              </li>
            ))}
          </ul>
        )}

        {/* mt-auto pins the button to the bottom so a row of cards lines up. */}
        <div className="mt-auto pt-6">
          <Button href={t.href(op.slug)} variant="outline" size="sm">
            {t.cta}
          </Button>
        </div>
      </div>
    </Card>
  );
}
