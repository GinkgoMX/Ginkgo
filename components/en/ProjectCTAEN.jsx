import CTABand from "../ui/CTABand";
import { getSiteText } from "@/lib/siteContent";

export default async function ProjectCTAEN() {
  const t = await getSiteText();
  return (
    <CTABand
      title={t("home.cta.title", "en")}
      text={t("home.cta.text", "en")}
      buttonLabel="Request information"
      secondary={{ href: "/en/opportunities", label: "Explore opportunities" }}
    />
  );
}
