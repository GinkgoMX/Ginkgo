import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-serif font-semibold uppercase tracking-[0.16em] transition-[background-color,color,border-color,box-shadow,transform] duration-500 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

const sizes = {
  md: "px-7 py-3.5 text-xs",
  sm: "px-5 py-2.5 text-[11px]",
};

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 hover:shadow-[0_12px_30px_-12px_rgb(16_40_70/0.6)]",
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
