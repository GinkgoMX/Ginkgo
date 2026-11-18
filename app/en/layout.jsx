import NavbarEN from "@/components/en/NavbarEN";
import FooterEN from "@/components/en/FooterEN";
import FixedCTA from "@/components/FixedCTA";
import LeadModal from "@/components/LeadModal";
import { getContactSettings } from "@/lib/siteSettings";
import { getSiteText } from "@/lib/siteContent";
import SetHtmlLang from "@/components/SetHtmlLang";

export const metadata = {
  title: {
    default: "GINKGO — Strategic Land Opportunities in Mexico",
    template: "%s | GINKGO",
  },
  description:
    "Large land tracts and real estate development opportunities in Mexico. We analyze, structure and market land for investors and developers.",
  alternates: {
    canonical: "/en",
    languages: { "es-MX": "/es", "en-US": "/en" },
  },
  openGraph: {
    siteName: "GINKGO",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
};

export default async function LayoutEN({ children }) {
  const { whatsappNumber } = await getContactSettings();
  const t = await getSiteText();

  return (
    <>
      <SetHtmlLang lang="en" />
      <NavbarEN />
      {children}
      <FooterEN />
      <FixedCTA whatsappNumber={whatsappNumber} />
      <LeadModal locale="en" title={t("home.hero.formTitle", "en")} subtitle={t("home.hero.formText", "en")} />
    </>
  );
}
