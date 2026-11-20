import Link from "next/link";
import { notFound } from "next/navigation";
import { getOpportunityBySlug, getPropertyDocuments } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import PropertyLocationMap from "@/components/maps/PropertyLocationMapClient";
import { toPublicMapPoint } from "@/lib/maps";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import SectionHeader, { SUBHEADING_CLASSES } from "@/components/ui/SectionHeader";
import DocumentList from "@/components/DocumentList";
import LeadFormA from "@/components/LeadFormA";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity) return {};
  return {
    title: opportunity.name_es,
    description: opportunity.developmentPotential_es?.slice(0, 155),
    alternates: {
      canonical: `/es/oportunidades/${slug}`,
      languages: { "es-MX": `/es/oportunidades/${slug}`, "en-US": `/en/opportunities/${slug}` },
    },
  };
}

// Layout: main column (why / the opportunity / location / technical /
// documents) beside a sticky summary card with the key facts and the dossier
// call to action, so the facts and the next step stay in view while reading.
export default async function OpportunityDetailES({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity || opportunity.status !== "disponible") notFound();
  const mapPoint = toPublicMapPoint(opportunity);
  const documents = await getPropertyDocuments(opportunity.id);
  const facts = [
    ["Superficie", opportunity.surface],
    ["Vocación", opportunity.vocation_es],
    ["Disponibilidad", opportunity.availability_es],
  ].filter(([, value]) => value);
  const hasLocation = opportunity.distances_es.length > 0 || mapPoint.coordinates || opportunity.mapImage;

  return (
    <main className="bg-cream">
      <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden">
        <Photo src={opportunity.heroImage} alt={opportunity.name_es} className="hero-media absolute inset-0" fallback="dark" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="hero-rise relative z-10 flex max-w-4xl flex-col items-center px-6 text-center">
          <Eyebrow className="justify-center text-white/80">Oportunidad de desarrollo</Eyebrow>
          <h1 className="mt-5 font-display text-5xl font-medium leading-[1.04] tracking-[-0.015em] text-white md:text-7xl">{opportunity.name_es}</h1>
          {opportunity.briefDescription_es && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{opportunity.briefDescription_es}</p>
          )}
          <Button href="#dossier" variant="light" className="mt-8">
            Solicitar información
          </Button>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
          <aside className="lg:order-2">
            <Card className="lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-medium text-charcoal">Lo esencial</h2>
              {facts.length > 0 && (
                <dl className="mt-4 divide-y divide-border border-t border-border">
                  {facts.map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-muted">{label}</dt>
                      <dd className="text-right font-medium text-charcoal">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              <Button href="#dossier" className="mt-6 w-full">
                Solicitar dossier
              </Button>
            </Card>
          </aside>

          <div className="space-y-12 lg:order-1">
            {opportunity.reasons_es.length > 0 && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>¿Por qué esta oportunidad?</h2>
                <ul className="space-y-3">
                  {opportunity.reasons_es.map((reason) => (
                    <li key={reason} className="flex gap-3 rounded-lg border border-border bg-paper p-5 leading-relaxed text-ink shadow-sm">
                      <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {opportunity.developmentPotential_es && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>La oportunidad</h2>
                <p className="whitespace-pre-line text-lg leading-relaxed text-ink">{opportunity.developmentPotential_es}</p>
              </div>
            )}

            {hasLocation && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Ubicación</h2>
                <Card padded={false} className="overflow-hidden">
                  {mapPoint.coordinates ? (
                    <PropertyLocationMap
                      coordinates={mapPoint.coordinates}
                      approximate={mapPoint.approximate}
                      name={opportunity.name_es}
                      locale="es"
                    />
                  ) : (
                    opportunity.mapImage && (
                      <Photo src={opportunity.mapImage} alt={opportunity.name_es} className="h-80 w-full" />
                    )
                  )}
                  {opportunity.distances_es.length > 0 && (
                    <ul className="space-y-2 p-6 text-ink md:p-8">
                      {opportunity.distances_es.map((dist) => (
                        <li key={dist}>{dist}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            )}

            {opportunity.techSheet && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Características técnicas</h2>
                <Button href={opportunity.techSheet} variant="outline" target="_blank" rel="noopener noreferrer">
                  Descargar ficha técnica
                </Button>
              </div>
            )}

            {documents.length > 0 && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Documentos</h2>
                <DocumentList documents={documents} />
              </div>
            )}

            <Link href="/es/oportunidades" className="inline-block text-sm font-semibold uppercase tracking-wide text-brand-600 hover:underline">
              ← Ver todas las oportunidades
            </Link>
          </div>
        </div>
      </Section>

      <Section id="dossier" bg="paper" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" title="Descarga del dossier" intro="Déjanos tus datos y te enviaremos el dossier completo de esta oportunidad." />
          <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
            <LeadFormA
              locale="es"
              propertyName={opportunity.name_es}
              propertySlug={opportunity.slug}
              id="lead-dossier"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
