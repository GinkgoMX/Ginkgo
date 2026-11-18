import NavbarES from "@/components/es/NavbarES";
import FooterES from "@/components/es/FooterES";
import FixedCTA from "@/components/FixedCTA";
import LeadModal from "@/components/LeadModal";
import { getContactSettings } from "@/lib/siteSettings";
import { getSiteText } from "@/lib/siteContent";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata = {
  title: {
    default: "GINKGO — Oportunidades Estratégicas de Suelo en México",
    template: "%s | GINKGO",
  },
  description:
    "Macrolotes y oportunidades de desarrollo inmobiliario en México. Analizamos, estructuramos y comercializamos tierra para inversionistas y desarrolladores.",
  alternates: {
    canonical: "/es",
    languages: { "es-MX": "/es", "en-US": "/en" },
  },
  openGraph: {
    siteName: "GINKGO",
    locale: "es_MX",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default async function LayoutES({ children }) {
  const { whatsappNumber } = await getContactSettings();
  const t = await getSiteText();

  return (
    <>
      <SetHtmlLang lang="es" />
      <NavbarES />
      {children}
      <FooterES />
      <FixedCTA whatsappNumber={whatsappNumber} />
      <LeadModal locale="es" title={t("home.hero.formTitle", "es")} subtitle={t("home.hero.formText", "es")} />
    </>
  );
}
