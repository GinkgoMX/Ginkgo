import { getSiteText } from "@/lib/siteContent";
import Section from "./ui/Section";

// Brand phrase band between the portfolio and the "Why Ginkgo" section.
export default async function BrandTagline({ locale }) {
  const t = await getSiteText();
  return (
    <Section bg="charcoal" spacing="default" innerClassName="text-center">
      <p
        data-reveal
        className="mx-auto max-w-4xl font-display text-3xl font-medium italic leading-[1.2] tracking-[-0.005em] text-white md:text-5xl"
      >
        {t("home.tagline", locale)}
      </p>
      <span data-reveal className="mx-auto mt-10 block h-px w-12 bg-gold" aria-hidden="true" />
    </Section>
  );
}
