import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import { getSiteText } from "@/lib/siteContent";

export default async function ProcessEN() {
  const t = await getSiteText();
  const steps = [1, 2, 3, 4].map((n) => ({ title: t(`home.process.${n}`, "en"), text: t(`home.process.${n}.text`, "en") }));
  return (
    <Section bg="cream">
      <SectionHeader
        align="center"
        eyebrow={t("home.process.eyebrow", "en")}
        title={t("home.process.title", "en")}
        intro={t("home.process.subtitle", "en")}
      />
      <SectionBody stagger={false}>
        <ol data-reveal-stagger className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative border-t border-charcoal/15 pt-8">
              <span className="absolute -top-[3px] left-0 h-[5px] w-[5px] rounded-full bg-gold" aria-hidden="true" />
              <span className="font-display text-6xl font-medium italic leading-none text-brand-600/25">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-2xl font-medium leading-[1.15] text-charcoal">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-[1.8] text-ink">{step.text}</p>
            </li>
          ))}
        </ol>
      </SectionBody>
    </Section>
  );
}
