import { getFeaturedOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import OpportunityCard from "../OpportunityCard";
import { getSiteText } from "@/lib/siteContent";

export default async function FeaturedOpportunitiesES() {
  const t = await getSiteText();
  const featured = (await getFeaturedOpportunities()).map(toLegacyOpportunity).slice(0, 3);

  return (
    <Section bg="cream">
      <SectionHeader
        eyebrow={t("portfolio.eyebrow", "es")}
        title={t("portfolio.title", "es")}
        intro={[t("portfolio.text.1", "es"), t("portfolio.text.2", "es")]}
        action={<Button href="/es/oportunidades">{t("portfolio.button", "es")}</Button>}
      />
      <SectionBody className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((op, index) => (
          <OpportunityCard key={op.slug} op={op} locale="es" index={index} showAdvantages />
        ))}
      </SectionBody>
    </Section>
  );
}
