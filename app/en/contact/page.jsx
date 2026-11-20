import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import LeadFormD from "@/components/LeadFormD";
import LeadFormB from "@/components/LeadFormB";
import { MailIcon, WhatsAppIcon, InstagramIcon } from "@/components/ui/icons";
import { getContactSettings, instagramHandle } from "@/lib/siteSettings";
import { buildWhatsappUrl, GENERIC_MESSAGE } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact",
  description: "We are here to help you find strategic development opportunities.",
  alternates: {
    canonical: "/en/contact",
    languages: { "es-MX": "/es/contacto", "en-US": "/en/contact" },
  },
};

function Channel({ icon, label, children }) {
  return (
    <Card className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">{icon}</div>
      <div className="min-w-0">
        <h2 className="font-display text-2xl font-medium text-charcoal">{label}</h2>
        {children}
      </div>
    </Card>
  );
}

const linkClasses = "mt-1 block truncate text-sm text-ink hover:text-brand-600";

// The contact page is the one place the general form stays embedded — it is
// what a visitor came here for. Everywhere else it opens in the modal.
export default async function ContactEN() {
  const { whatsappNumber, whatsappDisplay, email, instagramUrl } = await getContactSettings();
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, GENERIC_MESSAGE.en);

  return (
    <main className="bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Let's talk" title="Contact" intro="We are here to help you find strategic development opportunities." />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Channel icon={<WhatsAppIcon />} label="WhatsApp">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              {whatsappDisplay}
            </a>
          </Channel>
          <Channel icon={<MailIcon />} label="Email">
            <a href={`mailto:${email}`} title={email} className={linkClasses}>
              Send an email
            </a>
          </Channel>
          {instagramUrl && (
            <Channel icon={<InstagramIcon />} label="Instagram">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                {instagramHandle(instagramUrl)}
              </a>
            </Channel>
          )}
        </div>
      </Section>

      <Section id="formEN" bg="paper" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" title="Send us a message" intro="Tell us your requirements and we will present opportunities aligned with your profile." />
          <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
            <LeadFormD locale="en" id="lead-contact" />
          </div>
        </div>
      </Section>

      <Section id="promote-your-property" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" eyebrow="Property owners" title="Do you have a property you'd like to sell through Ginkgo?" intro="Submit your property for evaluation — our team will review it to see if it fits our commercialization profile." />
          <div className="rounded-lg border border-border bg-paper p-6 shadow-sm md:p-8">
            <LeadFormB locale="en" id="lead-sell-property" />
          </div>
        </div>
      </Section>
    </main>
  );
}
