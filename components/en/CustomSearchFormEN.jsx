import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import LeadFormC from "../LeadFormC";

export default function CustomSearchFormEN() {
  return (
    <Section bg="paper">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <SectionHeader
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Custom search"
          title="Didn't find what you're looking for?"
          intro="Tell us your city of interest, project type, required land size, and approximate budget, and we'll find opportunities aligned with your goals."
        />
        <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
          <LeadFormC locale="en" id="lead-search-en" />
        </div>
      </div>
    </Section>
  );
}
