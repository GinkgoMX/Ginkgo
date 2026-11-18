import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader, { SectionBody } from "@/components/ui/SectionHeader";
import CTABand from "@/components/ui/CTABand";
import { getSiteText } from "@/lib/siteContent";

export const metadata = {
  title: "Services",
  description:
    "Identifying, analyzing and marketing large land tracts and land with real estate development potential in Mexico.",
  alternates: {
    canonical: "/en/services",
    languages: { "es-MX": "/es/servicios", "en-US": "/en/services" },
  },
};

// Structure: label -> headline -> one-line executive intro -> two short
// supporting columns -> 2x2 service grid -> closing call to action.
export default async function ServicesEN() {
  const t = await getSiteText();
  const approach = [2, 3].map((n) => ({ title: t(`services.intro.${n}.title`, "en"), text: t(`services.intro.${n}`, "en") }));
  const services = [1, 2, 3, 4].map((n) => ({ title: t(`services.${n}.title`, "en"), text: t(`services.${n}.text`, "en") }));

  return (
    <main className="bg-cream">
      <Section spacing="header">
        <SectionHeader
          as="h1"
          eyebrow={t("services.eyebrow", "en")}
          title={t("services.title", "en")}
          intro={t("services.intro", "en")}
        />
        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-2 md:gap-12">
          {approach.map((item) => (
            <div key={item.title}>
              <h2 className="font-serif text-lg font-semibold text-charcoal">{item.title}</h2>
              <p className="mt-2 leading-relaxed text-ink">{item.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="paper">
        <SectionHeader title={t("services.list.title", "en")} />
        <SectionBody className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <Card key={service.title} className="flex flex-col">
              <span className="font-serif text-sm font-semibold tracking-wide text-gold-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-charcoal">{service.title}</h3>
              <span className="mt-4 block h-[2px] w-8 bg-gold" aria-hidden="true" />
              <p className="mt-4 leading-relaxed text-ink">{service.text}</p>
            </Card>
          ))}
        </SectionBody>
      </Section>

      <CTABand
        title="Looking for land to develop?"
        text="Tell us your requirements and we will find opportunities aligned with your goals."
        buttonLabel="Request information"
        secondary={{ href: "/en/opportunities", label: "Explore opportunities" }}
      />
    </main>
  );
}
