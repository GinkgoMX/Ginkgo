import Section from "../ui/Section";
import SectionHeader from "../ui/SectionHeader";
import LeadFormC from "../LeadFormC";

export default function CustomSearchFormES() {
  return (
    <Section bg="paper">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <SectionHeader
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Búsqueda a la medida"
          title="¿No encontraste lo que buscas?"
          intro="Cuéntanos ciudad de interés, tipo de proyecto, superficie y presupuesto aproximado, y encontraremos oportunidades alineadas con tus objetivos."
        />
        <div className="rounded-lg border border-border bg-cream p-6 md:p-8">
          <LeadFormC locale="es" id="lead-search-es" />
        </div>
      </div>
    </Section>
  );
}
