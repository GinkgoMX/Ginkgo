import Eyebrow from "./Eyebrow";

// Shared typography hierarchy for every section and page header:
//   eyebrow -> 12px -> title -> 16px -> intro -> 16px between paragraphs
// and a fixed 40/48px gap to whatever follows (use <SectionHeader> then
// <SectionBody>, or pass `action` for a button that sits beside the text).
// Titles use the display face (Cormorant Garamond). It runs optically smaller
// than Montserrat did, so the scale is one step up, set tight and at weight 500.
export const TITLE_CLASSES = {
  h1: "font-display text-5xl font-medium leading-[1.04] tracking-[-0.015em] text-charcoal md:text-6xl lg:text-7xl",
  h2: "font-display text-4xl font-medium leading-[1.06] tracking-[-0.01em] text-charcoal md:text-5xl",
};

// In-page subheading (e.g. "Ubicación" on a property page): one step below a
// section title, always followed by a 24px gap.
export const SUBHEADING_CLASSES =
  "mb-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-charcoal md:text-4xl";

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
      <Heading className={`${TITLE_CLASSES[as] ?? TITLE_CLASSES.h2} ${eyebrow ? "mt-5" : ""} ${textColor}`}>
        {title}
      </Heading>
      {paragraphs.length > 0 && (
        <div className={`mt-6 max-w-2xl space-y-3 text-base leading-[1.8] md:text-lg ${introColor} ${centered ? "mx-auto" : ""}`}>
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );

  if (!action)
    return (
      <header data-reveal className={className}>
        {text}
      </header>
    );

  return (
    <header data-reveal className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      {text}
      <div className="shrink-0">{action}</div>
    </header>
  );
}

// Content that follows a SectionHeader — the single source of the
// header-to-content gap. Its children reveal one after another on scroll
// (pass stagger={false} for a body that should simply appear).
export function SectionBody({ children, className = "", stagger = true }) {
  return (
    <div {...(stagger ? { "data-reveal-stagger": "" } : { "data-reveal": "" })} className={`mt-12 md:mt-16 ${className}`}>
      {children}
    </div>
  );
}
