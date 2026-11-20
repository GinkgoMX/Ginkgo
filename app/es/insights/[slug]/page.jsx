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
    title: article.title_es,
    description: article.excerpt_es,
    alternates: {
      canonical: `/es/insights/${slug}`,
      languages: { "es-MX": `/es/insights/${slug}`, "en-US": `/en/insights/${slug}` },
    },
  };
}

export default async function InsightDetailES({ params }) {
  const { slug } = await params;
  const article = toLegacyInsight(await getInsightBySlug(slug));
  if (!article) notFound();

  return (
    <main className="bg-cream">
      <section className="relative flex h-[45vh] min-h-[320px] items-end overflow-hidden">
        <Photo src={article.image} alt={article.title_es} className="hero-media absolute inset-0" fallback="dark" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/45 to-charcoal/20" />
        <div className="relative z-10 w-full px-6 pb-10 md:px-10 md:pb-12">
          <div className="hero-rise mx-auto max-w-3xl">
            <p className="font-serif text-[11px] font-semibold uppercase tracking-[0.28em] text-gold md:text-xs">
              {article.category_es}
              {article.date_es && <span className="text-white/70"> · {article.date_es}</span>}
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.06] tracking-[-0.01em] text-white md:text-6xl">{article.title_es}</h1>
          </div>
        </div>
      </section>

      <Section width="narrow">
        <article className="whitespace-pre-line text-lg leading-relaxed text-ink">{article.content_es}</article>
        <Link href="/es/insights" className="mt-10 inline-block text-sm font-semibold uppercase tracking-wide text-brand-600 hover:underline">
          ← Volver a Insights
        </Link>
      </Section>

      <CTABand title="¿Buscas oportunidades alineadas con estas tendencias?" text="Cuéntanos tus necesidades y te presentaremos opciones estratégicas." buttonLabel="Solicitar información" />
    </main>
  );
}
