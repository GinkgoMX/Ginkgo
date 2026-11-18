import Link from "next/link";
import { getRegions } from "@/lib/sanity/queries";
import { toLegacyRegion } from "@/lib/sanity/adapters";
import Photo from "../ui/Photo";
import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import LeadModalButton from "../LeadModalButton";

export default async function StrategicRegionsES() {
  const regions = (await getRegions()).map(toLegacyRegion);

  return (
    <Section bg="paper">
      <SectionHeader
        eyebrow="Cobertura"
        title="Regiones Estratégicas"
        intro="Oportunidades en los corredores de mayor crecimiento del país."
        action={<LeadModalButton variant="outline">Solicitar portafolio</LeadModalButton>}
      />

      <SectionBody className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region.slug}
            href={`/es/regiones/${region.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-paper shadow-sm transition-shadow hover:shadow-md"
          >
            <Photo src={region.heroImage} alt={region.name_es} className="h-44 w-full" />
            <div className="flex-1 p-5">
              <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-brand-600">
                {region.name_es}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink">{region.description_es}</p>
            </div>
          </Link>
        ))}
      </SectionBody>
    </Section>
  );
}
