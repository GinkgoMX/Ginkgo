import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import LeadModalButton from "../LeadModalButton";
import { getSiteText } from "@/lib/siteContent";

// The contact form used to sit in its own section right under the hero, which
// pushed the portfolio a full screen down. It now lives in the site-wide
// modal (components/LeadModal.jsx).
export default async function HeroES() {
  const t = await getSiteText();
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      <video
        className="hero-media absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-vid.mp4"
        poster="/videos/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/60" />

      <div className="hero-rise relative z-10 mx-auto max-w-4xl px-6 py-24 text-center text-white">
        <Eyebrow className="justify-center text-white/80">{t("home.hero.eyebrow", "es")}</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-7xl lg:text-[5.5rem]">
          {t("home.hero.title", "es")}
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-[1.8] text-white/80">
          {t("home.hero.subtitle", "es")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/es/oportunidades">Explorar oportunidades</Button>
          <LeadModalButton variant="ghost">Solicitar información</LeadModalButton>
        </div>
      </div>
    </section>
  );
}
