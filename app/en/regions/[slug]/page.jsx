import { notFound } from "next/navigation";
import { getRegionBySlug, getRegionDocuments } from "@/lib/sanity/queries";
import { toLegacyRegion } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import SectionHeader, { SUBHEADING_CLASSES } from "@/components/ui/SectionHeader";
import CTABand from "@/components/ui/CTABand";
import DocumentList from "@/components/DocumentList";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const region = toLegacyRegion(await getRegionBySlug(slug));
  if (!region) return {};
  return {
    title: region.name_en,
    description: region.description_en,
    alternates: {
      canonical: `/en/regions/${slug}`,
      languages: { "es-MX": `/es/regiones/${slug}`, "en-US": `/en/regions/${slug}` },
    },
  };
}

export default async function RegionDetailEN({ params }) {
  const { slug } = await params;
  const region = toLegacyRegion(await getRegionBySlug(slug));
  if (!region) notFound();
  const documents = await getRegionDocuments(region.id);

  return (
    <main className="bg-cream">
      <section className="relative flex h-[45vh] min-h-[320px] items-center justify-center overflow-hidden">
        <Photo src={region.heroImage} alt={region.name_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 px-6 text-center">
          <Eyebrow className="justify-center text-white/80">Strategic region</Eyebrow>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">{region.name_en}</h1>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12">
          <div>
            <p className="text-lg leading-relaxed text-ink">{region.description_en}</p>

            {region.advantages_en.length > 0 && (
              <div className="mt-12">
                <SectionHeader eyebrow="Why this region" title="Strategic Advantages" />
                <ul className="mt-8 space-y-3">
                  {region.advantages_en.map((adv) => (
                    <li key={adv} className="flex gap-3 rounded-lg border border-border bg-paper p-5 leading-relaxed text-ink shadow-sm">
                      <span className="mt-2.5 h-[2px] w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Photo
            src={region.mapImage}
            alt={`Map of ${region.name_en}`}
            className="h-80 w-full self-start rounded-lg border border-border lg:sticky lg:top-28"
          />
        </div>

        {documents.length > 0 && (
          <div className="mt-12">
            <h2 className={SUBHEADING_CLASSES}>Documents</h2>
            <DocumentList documents={documents} />
          </div>
        )}
      </Section>

      <CTABand title="Looking for opportunities in this region?" text="Tell us your requirements and we will present options aligned with your profile." buttonLabel="Request information" />
    </main>
  );
}
