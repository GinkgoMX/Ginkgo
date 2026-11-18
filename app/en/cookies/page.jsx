import Card from "@/components/ui/Card";

export const metadata = {
  title: "Cookie Policy",
  alternates: {
    canonical: "/en/cookies",
    languages: { "es-MX": "/es/cookies", "en-US": "/en/cookies" },
  },
};

export default function CookiesEN() {
  return (
    <main className="min-h-screen bg-cream px-6 py-14 md:px-10 md:py-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-4 font-serif text-4xl font-semibold leading-tight text-charcoal md:text-5xl">Cookie Policy</h1>
        <p className="mb-10 text-lg leading-relaxed text-ink">
          This policy explains how we use cookies and similar technologies on our site.
        </p>

        <Card className="space-y-4 leading-relaxed text-ink">
          <p>
            We use cookies to improve browsing experience, remember basic preferences, and
            analyze site usage.
          </p>
          <p>Cookies are not used to personally identify users without their explicit consent.</p>
          <p>
            Users may disable cookies in their browser settings. Some site features may be
            affected.
          </p>
        </Card>
      </section>
    </main>
  );
}
