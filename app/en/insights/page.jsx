import { getPublicInsights } from "@/lib/sanity/queries";
import { toLegacyInsight } from "@/lib/sanity/adapters";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Insights",
  description: "Analysis, trends, and perspectives on Mexico's real estate market.",
  alternates: {
    canonical: "/en/insights",
    languages: { "es-MX": "/es/insights", "en-US": "/en/insights" },
  },
};

export const revalidate = 60;

export default async function InsightsEN() {
  const insights = (await getPublicInsights()).map(toLegacyInsight);

  return (
    <main className="min-h-screen bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Perspectives" title="Insights" intro="Analysis, trends, and perspectives on Mexico's real estate market." />
      </Section>

      <Section spacing="flush-top">
        {insights.length === 0 ? (
          <p className="text-muted">New analysis will be published soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((article) => (
              <Card key={article.slug} padded={false} className="flex flex-col overflow-hidden">
                <Photo src={article.image} alt={article.title_en} className="h-48 w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                    {article.category_en}
                  </span>
                  <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-charcoal">
                    {article.title_en}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{article.date_en}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink">{article.excerpt_en}</p>
                  <div className="mt-auto pt-6">
                    <Button href={`/en/insights/${article.slug}`} variant="outline" size="sm">
                      Read more
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
