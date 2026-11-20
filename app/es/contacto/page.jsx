import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import LeadFormD from "@/components/LeadFormD";
import LeadFormB from "@/components/LeadFormB";
import { MailIcon, WhatsAppIcon, InstagramIcon } from "@/components/ui/icons";
import { getContactSettings, instagramHandle } from "@/lib/siteSettings";
import { buildWhatsappUrl, GENERIC_MESSAGE } from "@/lib/whatsapp";

export const metadata = {
  title: "Contacto",
  description: "Estamos aquí para ayudarte a encontrar oportunidades estratégicas de desarrollo.",
  alternates: {
    canonical: "/es/contacto",
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
export default async function ContactoES() {
  const { whatsappNumber, whatsappDisplay, email, instagramUrl } = await getContactSettings();
  const whatsappUrl = buildWhatsappUrl(whatsappNumber, GENERIC_MESSAGE.es);

  return (
    <main className="bg-cream">
      <Section spacing="header">
        <SectionHeader as="h1" eyebrow="Hablemos" title="Contacto" intro="Estamos aquí para ayudarte a encontrar oportunidades estratégicas de desarrollo." />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Channel icon={<WhatsAppIcon />} label="WhatsApp">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              {whatsappDisplay}
            </a>
          </Channel>
          <Channel icon={<MailIcon />} label="Correo">
            <a href={`mailto:${email}`} title={email} className={linkClasses}>
              Enviar correo
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

      <Section id="formulario" bg="paper" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" title="Envíanos un mensaje" intro="Cuéntanos tus necesidades y te presentaremos oportunidades alineadas con tu perfil." />
          <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
            <LeadFormD locale="es" id="lead-contacto" />
          </div>
        </div>
      </Section>

      <Section id="promueve-tu-propiedad" className="scroll-mt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <SectionHeader className="lg:sticky lg:top-28 lg:self-start" eyebrow="Propietarios" title="¿Tienes una propiedad que deseas comercializar?" intro="Promueve tu propiedad con Ginkgo y nuestro equipo la evaluará para determinar si se ajusta a nuestro perfil de comercialización." />
          <div className="rounded-lg border border-border bg-paper p-6 shadow-sm md:p-8">
            <LeadFormB locale="es" id="lead-promover-propiedad" />
          </div>
        </div>
      </Section>
    </main>
  );
}
