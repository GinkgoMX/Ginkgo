// `padded={false}` (or a "p-0" class) is for media cards and tables that run
// flush to the edges. "p-0" used to be passed straight through className, but
// Tailwind emits p-8 after p-0 in the stylesheet, so p-8 always won and photos
// and admin tables rendered inside a 32px frame.
export default function Card({ children, className = "", padded, ...props }) {
  const flush = padded === false || /(^|\s)p-0(\s|$)/.test(className);
  return (
    <div
      className={`rounded-lg border border-border bg-paper shadow-sm ${flush ? "" : "p-6 md:p-8"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
