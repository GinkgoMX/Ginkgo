import Link from "next/link";
import { getRegions } from "@/lib/sanity/queries";
import { toLegacyRegion } from "@/lib/sanity/adapters";
import Photo from "../ui/Photo";
import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import LeadModalButton from "../LeadModalButton";

export default async function StrategicRegionsEN() {
  const regions = (await getRegions()).map(toLegacyRegion);

  return (
    <Section bg="paper">
      <SectionHeader
        eyebrow="Coverage"
        title="Strategic Regions"
        intro="Opportunities across the country's highest-growth corridors."
        action={<LeadModalButton variant="outline">Request portfolio</LeadModalButton>}
      />

      <SectionBody className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Link
            key={region.slug}
            href={`/en/regions/${region.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-paper shadow-sm transition-shadow hover:shadow-md"
          >
            <Photo src={region.heroImage} alt={region.name_en} className="h-44 w-full" />
            <div className="flex-1 p-5">
              <h3 className="font-serif text-lg font-semibold text-charcoal group-hover:text-brand-600">
                {region.name_en}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink">{region.description_en}</p>
            </div>
          </Link>
        ))}
      </SectionBody>
    </Section>
  );
}
