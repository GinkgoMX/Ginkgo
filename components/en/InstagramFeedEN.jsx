import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

export default function InstagramFeedEN() {
  return (
    <Section bg="cream">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Community"
            title="Follow us on Instagram"
            intro="See our opportunities, market analysis, and presence across the country's key regions."
          />
          <Button
            href="https://www.instagram.com/ginkgomex"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="mt-8"
          >
            View full profile
          </Button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <iframe
            src="https://www.instagram.com/ginkgomex/embed"
            width="400"
            height="480"
            title="Ginkgo Instagram posts"
            loading="lazy"
            scrolling="no"
            className="w-full max-w-[400px] rounded-lg border border-border bg-paper shadow-sm"
          />
        </div>
      </div>
    </Section>
  );
}
