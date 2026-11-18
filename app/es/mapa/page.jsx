import { getMapOpportunities } from "@/lib/sanity/queries";
import { toLegacyOpportunity } from "@/lib/sanity/adapters";
import { toPublicMapPoint } from "@/lib/maps";
import PublicPropertyMap from "@/components/maps/PublicPropertyMapClient";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { getContactSettings } from "@/lib/siteSettings";

export const revalidate = 60;

export const metadata = {
  title: "Mapa de Oportunidades",
  description: "Explora en el mapa todas las oportunidades disponibles de Ginkgo en México.",
  alternates: {
    canonical: "/es/mapa",
    languages: { "es-MX": "/es/mapa", "en-US": "/en/map" },
  },
};

export default async function MapaES() {
  const { whatsappNumber } = await getContactSettings();
  const properties = (await getMapOpportunities()).map(toLegacyOpportunity).map(toPublicMapPoint).filter((p) => p.coordinates);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Explora" title="Mapa de Oportunidades" intro="Ubica cada oportunidad y solicita información directamente desde el mapa." />
      </Section>

      <Section spacing="flush-top">
        <PublicPropertyMap properties={properties} locale="es" whatsappNumber={whatsappNumber} />
      </Section>
    </main>
  );
}
