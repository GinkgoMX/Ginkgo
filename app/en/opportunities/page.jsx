import { getPublicOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import OpportunityCard from "@/components/OpportunityCard";
import { getSiteText } from "@/lib/siteContent";

export const revalidate = 60;

export const metadata = {
  title: "Opportunities",
  description: "Strategic land opportunities for developers and investors in Mexico.",
  alternates: {
    canonical: "/en/opportunities",
    languages: { "es-MX": "/es/oportunidades", "en-US": "/en/opportunities" },
  },
};

export default async function OpportunitiesListEN() {
  const t = await getSiteText();
  const docs = await getPublicOpportunities();
  const opportunities = docs.map(toLegacyOpportunity);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader
          as="h1"
          eyebrow={t("portfolio.eyebrow", "en")}
          title={t("portfolio.title", "en")}
          intro={[t("portfolio.text.1", "en"), t("portfolio.text.2", "en")]}
        />
      </Section>

      <Section spacing="flush-top">
        {opportunities.length === 0 ? (
          <p className="text-muted">New opportunities coming soon.</p>
        ) : (
          <div data-reveal-stagger className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((op, index) => (
              <OpportunityCard key={op.slug} op={op} locale="en" index={index} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
