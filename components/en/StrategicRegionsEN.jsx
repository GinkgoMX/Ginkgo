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
            className="group relative block aspect-[4/5] overflow-hidden rounded-xl bg-charcoal"
          >
            <div className="media-zoom absolute inset-0">
              <Photo
                src={region.heroImage}
                alt={region.name_en}
                fallback="dark"
                className="absolute inset-0"
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="block h-px w-8 bg-gold transition-all duration-700 ease-out-expo group-hover:w-14" aria-hidden="true" />
              <h3 className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-white">
                {region.name_en}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/70">
                {region.description_en}
              </p>
            </div>
          </Link>
        ))}
      </SectionBody>
    </Section>
  );
}
