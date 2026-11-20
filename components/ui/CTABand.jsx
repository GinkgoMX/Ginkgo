import Section from "./Section";
import Button from "./Button";
import LeadModalButton from "../LeadModalButton";

// Closing call to action used at the end of pages, in place of the embedded
// contact forms: a short pitch and a button that opens the lead modal.
export default function CTABand({ title, text, buttonLabel, secondary, bg = "charcoal" }) {
  const dark = bg === "charcoal" || bg === "teal";
  return (
    <Section bg={bg} spacing="default" width="narrow" innerClassName="text-center">
      <div data-reveal>
        <span className="mx-auto mb-8 block h-px w-12 bg-gold" aria-hidden="true" />
        <h2
          className={`font-display text-4xl font-medium leading-[1.08] tracking-[-0.01em] md:text-5xl ${dark ? "text-white" : "text-charcoal"}`}
        >
          {title}
        </h2>
        {text && (
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-[1.8] ${dark ? "text-white/75" : "text-ink"}`}>{text}</p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <LeadModalButton variant={dark ? "light" : "primary"}>{buttonLabel}</LeadModalButton>
          {secondary && (
            <Button href={secondary.href} variant={dark ? "ghost" : "outline"}>
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
