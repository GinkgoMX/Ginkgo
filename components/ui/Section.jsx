// The one place the site's vertical rhythm and content widths are defined.
// Every public section goes through this so spacing stays identical page to
// page:
//   spacing "default"  — regular section            80px mobile / 128px desktop
//   spacing "compact"  — bands                      64px / 80px
//   spacing "header"   — interior page header       80/128 top, 48/64 bottom
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
  default: "py-20 md:py-32",
  compact: "py-16 md:py-20",
  header: "pt-20 pb-12 md:pt-32 md:pb-16",
  "flush-top": "pt-0 pb-20 md:pb-32",
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
