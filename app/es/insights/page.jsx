import { getPublicInsights } from "@/lib/sanity/queries";
import { toLegacyInsight } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Insights",
  description: "Análisis, tendencias y perspectivas del mercado inmobiliario en México.",
  alternates: {
    canonical: "/es/insights",
    languages: { "es-MX": "/es/insights", "en-US": "/en/insights" },
  },
};

export const revalidate = 60;

export default async function InsightsES() {
  const insights = (await getPublicInsights()).map(toLegacyInsight);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Perspectivas" title="Insights" intro="Análisis, tendencias y perspectivas del mercado inmobiliario en México." />
      </Section>

      <Section spacing="flush-top">
        {insights.length === 0 ? (
          <p className="text-muted">Pronto publicaremos nuevos análisis.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((article) => (
              <Card key={article.slug} padded={false} className="flex flex-col overflow-hidden">
                <Photo src={article.image} alt={article.title_es} className="h-48 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {article.category_es}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-medium leading-[1.15] text-charcoal">
                    {article.title_es}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{article.date_es}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{article.excerpt_es}</p>
                  <div className="mt-auto pt-6">
                    <Button href={`/es/insights/${article.slug}`} variant="outline" size="sm">
                      Leer más
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
