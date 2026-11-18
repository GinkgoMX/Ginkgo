import Card from "../ui/Card";
import Section from "../ui/Section";
import SectionHeader, { SectionBody } from "../ui/SectionHeader";
import { getSiteText } from "@/lib/siteContent";

const ITEM_KEYS = [1, 2, 3, 4];

export default async function WhyGinkgoEN() {
  const t = await getSiteText();
  const items = ITEM_KEYS.map((n) => ({ title: t(`home.why.${n}.title`, "en"), text: t(`home.why.${n}.text`, "en") }));
  return (
    <Section bg="paper">
      <SectionHeader eyebrow={t("home.why.eyebrow", "en")} title={t("home.why.title", "en")} />
      <SectionBody className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.title}>
            <h3 className="font-serif text-xl font-semibold text-brand-600">{item.title}</h3>
            <p className="mt-3 leading-relaxed text-ink">{item.text}</p>
          </Card>
        ))}
      </SectionBody>
    </Section>
  );
}
