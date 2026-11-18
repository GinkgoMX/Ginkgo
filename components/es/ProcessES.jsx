import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import { getSiteText } from "@/lib/siteContent";

export default async function ProcessES() {
  const t = await getSiteText();
  const steps = [1, 2, 3, 4].map((n) => ({ title: t(`home.process.${n}`, "es"), text: t(`home.process.${n}.text`, "es") }));
  return (
    <Section bg="cream">
      <SectionHeader
        align="center"
        eyebrow={t("home.process.eyebrow", "es")}
        title={t("home.process.title", "es")}
        intro={t("home.process.subtitle", "es")}
      />
      <SectionBody>
        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-lg font-semibold text-charcoal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-charcoal">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink">{step.text}</p>
            </li>
          ))}
        </ol>
      </SectionBody>
    </Section>
  );
}
