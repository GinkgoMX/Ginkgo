import { getPublicOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import OpportunityCard from "@/components/OpportunityCard";
import { getSiteText } from "@/lib/siteContent";

export const revalidate = 60;

export const metadata = {
  title: "Oportunidades",
  description: "Terrenos estratégicos para desarrolladores e inversionistas en México.",
  alternates: {
    canonical: "/es/oportunidades",
    languages: { "es-MX": "/es/oportunidades", "en-US": "/en/opportunities" },
  },
};

export default async function OpportunitiesListES() {
  const t = await getSiteText();
  const docs = await getPublicOpportunities();
  const opportunities = docs.map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader
          as="h1"
          eyebrow={t("portfolio.eyebrow", "es")}
          title={t("portfolio.title", "es")}
          intro={[t("portfolio.text.1", "es"), t("portfolio.text.2", "es")]}
        />
      </Section>

      <Section spacing="flush-top">
        {opportunities.length === 0 ? (
          <p className="text-muted">Próximamente nuevas oportunidades.</p>
        ) : (
          <div data-reveal-stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((op, index) => (
              <OpportunityCard key={op.slug} op={op} locale="es" index={index} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
