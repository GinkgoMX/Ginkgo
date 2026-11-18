import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const sizes = {
  md: "px-6 py-3 text-sm",
  sm: "px-4 py-2.5 text-xs",
};

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  outline: "border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white",
  ghost: "border border-white text-white hover:bg-white hover:text-charcoal",
  light: "bg-white text-charcoal hover:bg-cream",
};

export function buttonClasses({ variant = "primary", size = "md", className = "" } = {}) {
  return `${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`;
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = buttonClasses({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
