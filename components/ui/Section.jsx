// The one place the site's vertical rhythm and content widths are defined.
// Every public section goes through this so spacing stays identical page to
// page:
//   spacing "default"  — regular section            56px mobile / 80px desktop
//   spacing "compact"  — bands (tagline, CTA)       48px / 64px
//   spacing "header"   — interior page header       56/80 top, 40/48 bottom
//   spacing "flush-top"— section that continues the one above (same bg)
// Widths: "wide" is the site grid (cards, maps); "narrow" is for reading text
// and forms, so long paragraphs never exceed ~75 characters per line.
const backgrounds = {
  cream: "bg-cream text-charcoal",
  paper: "bg-paper text-charcoal",
  teal: "bg-brand-600 text-white",
  charcoal: "bg-charcoal text-white",
};

const spacings = {
  default: "py-14 md:py-20",
  compact: "py-12 md:py-16",
  header: "pt-14 pb-10 md:pt-20 md:pb-12",
  "flush-top": "pt-0 pb-14 md:pb-20",
};

const widths = {
  wide: "max-w-6xl",
  narrow: "max-w-3xl",
};

export default function Section({
  children,
  className = "",
  innerClassName = "",
  bg = "cream",
  spacing = "default",
  width = "wide",
  as: Comp = "section",
  ...props
}) {
  return (
    <Comp
      className={`${backgrounds[bg] ?? backgrounds.cream} px-6 md:px-10 ${spacings[spacing] ?? spacings.default} ${className}`}
      {...props}
    >
      <div className={`mx-auto ${widths[width] ?? widths.wide} ${innerClassName}`}>{children}</div>
    </Comp>
  );
}
