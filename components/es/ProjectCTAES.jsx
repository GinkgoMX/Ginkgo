import CTABand from "../ui/CTABand";
import { getSiteText } from "@/lib/siteContent";

export default async function ProjectCTAES() {
  const t = await getSiteText();
  return (
    <CTABand
      title={t("home.cta.title", "es")}
      text={t("home.cta.text", "es")}
      buttonLabel="Solicitar información"
      secondary={{ href: "/es/oportunidades", label: "Explorar oportunidades" }}
    />
  );
}
