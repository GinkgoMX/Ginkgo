import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import CTABand from "@/components/ui/CTABand";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "About",
  description:
    "Ginkgo specializes in large land tracts and land with development potential, connecting owners, investors and developers through analysis, context and strategy.",
  alternates: {
    canonical: "/en/about",
    languages: { "es-MX": "/es/nosotros", "en-US": "/en/about" },
  },
};

export default async function AboutEN() {
  const t = await getSiteText();
  return (
    <main className="bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow={t("about.eyebrow", "en")} title={t("about.title", "en")} intro={t("about.intro", "en")} />
      </Section>

      <Section spacing="flush-top">
        <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink">
            <p>{t("about.vision.1", "en")}</p>
            <p>{t("about.vision.2", "en")}</p>
            <p>{t("about.vision.3", "en")}</p>
          </div>
          <blockquote className="self-start border-l-2 border-gold pl-6 font-display text-2xl italic leading-[1.4] text-charcoal md:text-3xl lg:sticky lg:top-28">
            {t("about.question", "en")}
          </blockquote>
        </div>
      </Section>

      <Section bg="paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader eyebrow={t("about.who.eyebrow", "en")} title={t("about.who.title", "en")} />
          <div className="space-y-4 leading-relaxed text-ink">
            <p>{t("about.who.1", "en")}</p>
            <p>{t("about.who.2", "en")}</p>
            <p>{t("about.who.3", "en")}</p>
            <p className="border-l-2 border-gold pl-4 font-semibold text-charcoal">{t("about.who.commitment", "en")}</p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Want access to our full portfolio?"
        text="Tell us your requirements and we will present opportunities aligned with your profile."
        buttonLabel="Request information"
        secondary={{ href: "/en/opportunities", label: "Explore opportunities" }}
      />
    </main>
  );
}
