import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import CTABand from "@/components/ui/CTABand";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "Nosotros",
  description:
    "Ginkgo se especializa en macrolotes y terrenos con potencial de desarrollo, acercando a propietarios, inversionistas y desarrolladores con análisis, contexto y estrategia.",
  alternates: {
    canonical: "/es/nosotros",
    languages: { "es-MX": "/es/nosotros", "en-US": "/en/about" },
  },
};

export default async function NosotrosES() {
  const t = await getSiteText();
  return (
    <main className="bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow={t("about.eyebrow", "es")} title={t("about.title", "es")} intro={t("about.intro", "es")} />
      </Section>

      <Section spacing="flush-top">
        <div className="grid grid-cols-1 gap-10 border-t border-border pt-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink">
            <p>{t("about.vision.1", "es")}</p>
            <p>{t("about.vision.2", "es")}</p>
            <p>{t("about.vision.3", "es")}</p>
          </div>
          <blockquote className="self-start border-l-2 border-gold pl-6 font-display text-2xl italic leading-[1.4] text-charcoal md:text-3xl lg:sticky lg:top-28">
            {t("about.question", "es")}
          </blockquote>
        </div>
      </Section>

      <Section bg="paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader eyebrow={t("about.who.eyebrow", "es")} title={t("about.who.title", "es")} />
          <div className="space-y-4 leading-relaxed text-ink">
            <p>{t("about.who.1", "es")}</p>
            <p>{t("about.who.2", "es")}</p>
            <p>{t("about.who.3", "es")}</p>
            <p className="border-l-2 border-gold pl-4 font-semibold text-charcoal">{t("about.who.commitment", "es")}</p>
          </div>
        </div>
      </Section>

      <CTABand
        title="¿Quieres conocer nuestro portafolio completo?"
        text="Compártenos tus necesidades y te presentaremos oportunidades alineadas con tu perfil."
        buttonLabel="Solicitar información"
        secondary={{ href: "/es/oportunidades", label: "Explorar oportunidades" }}
      />
    </main>
  );
}
