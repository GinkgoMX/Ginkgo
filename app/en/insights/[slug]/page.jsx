import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsightBySlug } from "@/lib/sanity/queries";
import { toLegacyInsight } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Section from "@/components/ui/Section";
import CTABand from "@/components/ui/CTABand";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = toLegacyInsight(await getInsightBySlug(slug));
  if (!article) return {};
  return {
    title: article.title_en,
    description: article.excerpt_en,
    alternates: {
      canonical: `/en/insights/${slug}`,
      languages: { "es-MX": `/es/insights/${slug}`, "en-US": `/en/insights/${slug}` },
    },
  };
}

export default async function InsightDetailEN({ params }) {
  const { slug } = await params;
  const article = toLegacyInsight(await getInsightBySlug(slug));
  if (!article) notFound();

  return (
    <main className="bg-cream">
      <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden">
        <Photo src={article.image} alt={article.title_en} className="absolute inset-0" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/20" />
        <div className="relative z-10 w-full px-6 pb-10 md:px-10 md:pb-12">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {article.category_en}
              {article.date_en && <span className="text-white/70"> · {article.date_en}</span>}
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white md:text-5xl">{article.title_en}</h1>
          </div>
        </div>
      </section>

      <Section width="narrow">
        <article className="whitespace-pre-line text-lg leading-relaxed text-ink">{article.content_en}</article>
        <Link href="/en/insights" className="mt-10 inline-block text-sm font-semibold uppercase tracking-wide text-brand-600 hover:underline">
          ← Back to Insights
        </Link>
      </Section>

      <CTABand title="Looking for opportunities aligned with these trends?" text="Tell us your requirements and we will present strategic options." buttonLabel="Request information" />
    </main>
  );
}
