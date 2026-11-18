import { getMapOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import { toPublicMapPoint } from "@/lib/maps";
import PublicPropertyMap from "@/components/maps/PublicPropertyMapClient";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getContactSettings } from "@/lib/siteSettings";

export const revalidate = 60;

export const metadata = {
  title: "Opportunities Map",
  description: "Explore all of Ginkgo's available opportunities in Mexico on the map.",
  alternates: {
    canonical: "/en/map",
    languages: { "es-MX": "/es/mapa", "en-US": "/en/map" },
  },
};

export default async function MapEN() {
  const { whatsappNumber } = await getContactSettings();
  const properties = (await getMapOpportunities()).map(toLegacyOpportunity).map(toPublicMapPoint).filter((p) => p.coordinates);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Explore" title="Opportunities Map" intro="Locate every opportunity and request information directly from the map." />
      </Section>

      <Section spacing="flush-top">
        <PublicPropertyMap properties={properties} locale="en" whatsappNumber={whatsappNumber} />
      </Section>
    </main>
  );
}
