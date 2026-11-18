import Section from "./Section";
import Button from "./Button";
import LeadModalButton from "../LeadModalButton";

// Closing call to action used at the end of pages, in place of the embedded
// contact forms: a short pitch and a button that opens the lead modal.
export default function CTABand({ title, text, buttonLabel, secondary, bg = "charcoal" }) {
  const dark = bg === "charcoal" || bg === "teal";
  return (
    <Section bg={bg} spacing="compact" width="narrow" innerClassName="text-center">
      <span className="mx-auto mb-5 block h-[2px] w-10 bg-gold" aria-hidden="true" />
      <h2 className={`font-serif text-3xl font-semibold leading-tight md:text-4xl ${dark ? "text-white" : "text-charcoal"}`}>
        {title}
      </h2>
      {text && <p className={`mx-auto mt-4 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/75" : "text-ink"}`}>{text}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <LeadModalButton variant={dark ? "light" : "primary"}>{buttonLabel}</LeadModalButton>
        {secondary && (
          <Button href={secondary.href} variant={dark ? "ghost" : "outline"}>
            {secondary.label}
          </Button>
        )}
      </div>
    </Section>
  );
}
