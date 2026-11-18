// Small uppercase label above a heading. The text sits in its own span so a
// centered label that wraps to two lines stays centered as a block next to
// the gold dash; on phones a centered label drops the dash (it would sit
// stranded beside a wrapped line).
export default function Eyebrow({ children, className = "" }) {
  const centered = /(^|\s)justify-center(\s|$)/.test(className);
  return (
    <p
      className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600 md:text-sm ${className}`}
    >
      <span className={`h-[2px] w-5 shrink-0 bg-gold ${centered ? "hidden md:block" : ""}`} aria-hidden="true" />
      <span className={centered ? "text-center" : ""}>{children}</span>
    </p>
  );
}
