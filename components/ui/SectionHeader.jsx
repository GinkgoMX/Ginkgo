import Eyebrow from "./Eyebrow";

// Shared typography hierarchy for every section and page header:
//   eyebrow -> 12px -> title -> 16px -> intro -> 16px between paragraphs
// and a fixed 40/48px gap to whatever follows (use <SectionHeader> then
// <SectionBody>, or pass `action` for a button that sits beside the text).
export const TITLE_CLASSES = {
  h1: "font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl",
  h2: "font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl",
};

// In-page subheading (e.g. "Ubicación" on a property page): one step below a
// section title, always followed by a 24px gap.
export const SUBHEADING_CLASSES = "mb-6 font-serif text-2xl font-semibold leading-tight text-charcoal md:text-3xl";

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  as = "h2",
  align = "left",
  action,
  invert = false,
  className = "",
}) {
  const Heading = as;
  const centered = align === "center";
  const paragraphs = Array.isArray(intro) ? intro.filter(Boolean) : intro ? [intro] : [];
  const textColor = invert ? "text-white" : "";
  const introColor = invert ? "text-white/75" : "text-ink";

  const text = (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <Eyebrow className={`${centered ? "justify-center" : ""} ${invert ? "text-white/80" : ""}`}>{eyebrow}</Eyebrow>
      )}
      <Heading className={`${TITLE_CLASSES[as] ?? TITLE_CLASSES.h2} ${eyebrow ? "mt-3" : ""} ${textColor}`}>
        {title}
      </Heading>
      {paragraphs.length > 0 && (
        <div className={`mt-4 max-w-2xl space-y-3 text-lg leading-relaxed ${introColor} ${centered ? "mx-auto" : ""}`}>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );

  if (!action) return <header className={className}>{text}</header>;

  return (
    <header className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      {text}
      <div className="shrink-0">{action}</div>
    </header>
  );
}

// Content that follows a SectionHeader — the single source of the
// header-to-content gap.
export function SectionBody({ children, className = "" }) {
  return <div className={`mt-10 md:mt-12 ${className}`}>{children}</div>;
}
