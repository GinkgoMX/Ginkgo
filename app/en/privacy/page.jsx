import Card from "@/components/ui/Card";
import { getContactSettings } from "@/lib/siteSettings";

export const metadata = {
  title: "Privacy Notice",
  alternates: {
    canonical: "/en/privacy",
    languages: { "es-MX": "/es/privacidad", "en-US": "/en/privacy" },
  },
};

export default async function PrivacyEN() {
  const { email } = await getContactSettings();
  return (
    <main className="min-h-screen bg-cream px-6 py-14 md:px-10 md:py-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="mb-6 font-display text-5xl font-medium leading-[1.04] tracking-[-0.015em] text-charcoal md:text-6xl">Privacy Notice</h1>
        <p className="mb-10 text-lg leading-relaxed text-ink">
          This notice summarizes how Ginkgo collects, uses, and protects user information.
        </p>

        <Card className="space-y-4 leading-relaxed text-ink">
          <p>
            Ginkgo collects contact data voluntarily provided by users, such as name, email,
            phone, and company.
          </p>
          <p>
            This information is used exclusively to follow up on information requests, share
            opportunities, and maintain communication related to our services.
          </p>
          <p>
            We do not share personal data with third parties outside the commercial relationship,
            except when legally required.
          </p>
          <p>
            Users may request the update or deletion of their data by writing to{" "}
            <a href={`mailto:${email}`} className="text-brand-600 hover:underline">
              {email}
            </a>
            .
          </p>
        </Card>
      </section>
    </main>
  );
}
