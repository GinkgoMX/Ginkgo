import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import { getSiteText } from "@/lib/siteContent";

const ITEM_KEYS = [1, 2, 3, 4];

export default async function WhyGinkgoES() {
  const t = await getSiteText();
  const items = ITEM_KEYS.map((n) => ({ title: t(`home.why.${n}.title`, "es"), text: t(`home.why.${n}.text`, "es") }));
  return (
    <Section bg="paper">
      <SectionHeader eyebrow={t("home.why.eyebrow", "es")} title={t("home.why.title", "es")} />
      <SectionBody className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
        {items.map((item, index) => (
          <div key={item.title} className="border-t border-border pt-8">
            <span className="font-display text-2xl italic text-gold-700">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 font-display text-3xl font-medium leading-[1.12] tracking-[-0.01em] text-charcoal">
              {item.title}
            </h3>
            <p className="mt-4 max-w-md leading-[1.8] text-ink">{item.text}</p>
          </div>
        ))}
      </SectionBody>
    </Section>
  );
}
