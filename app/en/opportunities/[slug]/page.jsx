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
    title: opportunity.name_en,
    description: opportunity.developmentPotential_en?.slice(0, 155),
    alternates: {
      canonical: `/en/opportunities/${slug}`,
      languages: { "es-MX": `/es/oportunidades/${slug}`, "en-US": `/en/opportunities/${slug}` },
    },
  };
}

// Layout: main column (why / the opportunity / location / technical /
// documents) beside a sticky summary card with the key facts and the dossier
// call to action, so the facts and the next step stay in view while reading.
export default async function OpportunityDetailEN({ params }) {
  const { slug } = await params;
  const opportunity = toLegacyOpportunity(await getOpportunityBySlug(slug));
  if (!opportunity || opportunity.status !== "disponible") notFound();
  const mapPoint = toPublicMapPoint(opportunity);
  const documents = await getPropertyDocuments(opportunity.id);
  const facts = [
    ["Surface", opportunity.surface],
    ["Land use", opportunity.vocation_en],
    ["Availability", opportunity.availability_en],
  ].filter(([, value]) => value);
  const hasLocation = opportunity.distances_en.length > 0 || mapPoint.coordinates || opportunity.mapImage;

  return (
    <main className="bg-cream">
      <section className="relative flex h-[50vh] min-h-[360px] items-center justify-center overflow-hidden">
        <Photo src={opportunity.heroImage} alt={opportunity.name_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
          <Eyebrow className="justify-center text-white/80">Development opportunity</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">{opportunity.name_en}</h1>
          {opportunity.briefDescription_en && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{opportunity.briefDescription_en}</p>
          )}
          <Button href="#dossier" variant="light" className="mt-8">
            Request information
          </Button>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-12">
          <aside className="lg:order-2">
            <Card className="lg:sticky lg:top-28">
              <h2 className="font-serif text-lg font-semibold text-charcoal">Essential Information</h2>
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
                Request the dossier
              </Button>
            </Card>
          </aside>

          <div className="space-y-12 lg:order-1">
            {opportunity.reasons_en.length > 0 && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Why This Opportunity?</h2>
                <ul className="space-y-3">
                  {opportunity.reasons_en.map((reason) => (
                    <li key={reason} className="flex gap-3 rounded-lg border border-border bg-paper p-5 leading-relaxed text-ink shadow-sm">
                      <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {opportunity.developmentPotential_en && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>The Opportunity</h2>
                <p className="whitespace-pre-line text-lg leading-relaxed text-ink">{opportunity.developmentPotential_en}</p>
              </div>
            )}

            {hasLocation && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Location</h2>
                <Card padded={false} className="overflow-hidden">
                  {mapPoint.coordinates ? (
                    <PropertyLocationMap
                      coordinates={mapPoint.coordinates}
                      approximate={mapPoint.approximate}
                      name={opportunity.name_en}
                      locale="en"
                    />
                  ) : (
                    opportunity.mapImage && (
                      <Photo src={opportunity.mapImage} alt={opportunity.name_en} className="h-80 w-full" />
                    )
                  )}
                  {opportunity.distances_en.length > 0 && (
                    <ul className="space-y-2 p-6 text-ink md:p-8">
                      {opportunity.distances_en.map((dist) => (
                        <li key={dist}>{dist}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              </div>
            )}

            {opportunity.techSheet && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Technical Specifications</h2>
                <Button href={opportunity.techSheet} variant="outline" target="_blank" rel="noopener noreferrer">
                  Download Technical Sheet
                </Button>
              </div>
            )}

            {documents.length > 0 && (
              <div>
                <h2 className={SUBHEADING_CLASSES}>Documents</h2>
                <DocumentList documents={documents} />
              </div>
            )}

            <Link href="/en/opportunities" className="inline-block text-sm font-semibold uppercase tracking-wide text-brand-600 hover:underline">
              ← View all opportunities
            </Link>
          </div>
        </div>
      </Section>

      <Section id="dossier" bg="paper" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" title="Download the Dossier" intro="Leave your details and we'll send you the full dossier for this opportunity." />
          <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
            <LeadFormA
              locale="en"
              propertyName={opportunity.name_en}
              propertySlug={opportunity.slug}
              id="lead-dossier"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}
