import Button from "../ui/Button";
import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";

export default function InstagramFeedES() {
  return (
    <Section bg="cream">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          <SectionHeader
            eyebrow="Comunidad"
            title="Síguenos en Instagram"
            intro="Conoce nuestras oportunidades, análisis y presencia en las principales regiones del país."
          />
          <Button
            href="https://www.instagram.com/ginkgomex"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="mt-8"
          >
            Ver perfil completo
          </Button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <iframe
            src="https://www.instagram.com/ginkgomex/embed"
            width="400"
            height="480"
            title="Publicaciones de Instagram de Ginkgo"
            loading="lazy"
            scrolling="no"
            className="w-full max-w-[400px] rounded-lg border border-border bg-paper shadow-sm"
          />
        </div>
      </div>
    </Section>
  );
}
