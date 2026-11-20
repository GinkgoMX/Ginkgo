import Link from "next/link";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getAdminDashboardStats } from "@/lib/sanity/queries";
import Card from "@/components/ui/Card";

export const metadata = { title: "Dashboard" };

// Read straight from Sanity on every visit — staff expect the numbers to move
// the moment they save something.
export const dynamic = "force-dynamic";

const LEAD_STATUSES = [
  { key: "nuevo", label: "Nuevo", bar: "bg-gold" },
  { key: "contactado", label: "Contactado", bar: "bg-brand-400" },
  { key: "seguimiento", label: "En seguimiento", bar: "bg-brand-600" },
  { key: "cerrado", label: "Cerrado", bar: "bg-charcoal" },
  { key: "descartado", label: "Descartado", bar: "bg-border" },
];

const PROPERTY_STATUSES = [
  { key: "disponible", label: "Disponibles (en el sitio)", bar: "bg-brand-600" },
  { key: "reservado", label: "Reservadas", bar: "bg-gold" },
  { key: "vendido", label: "Vendidas", bar: "bg-charcoal" },
  { key: "oculto", label: "Ocultas", bar: "bg-border" },
];

const ACTION_LABELS = {
  create: "creó",
  update: "actualizó",
  delete: "eliminó",
  publish: "mostró en el sitio",
  unpublish: "ocultó del sitio",
};

const ENTITY_LABELS = {
  opportunity: "la propiedad",
  region: "la región",
  insight: "el artículo",
  siteDocument: "el documento",
  document: "el documento",
  lead: "el lead",
  siteSettings: "la configuración",
  siteContent: "el contenido",
};

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  });
}

function StatCard({ href, label, value, detail }) {
  return (
    <Link href={href} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
        <p className="mt-2 font-serif text-3xl font-semibold text-charcoal">{value}</p>
        {detail && <p className="mt-1 text-sm text-muted">{detail}</p>}
      </Card>
    </Link>
  );
}

// Horizontal bars: each status as a share of the total, with its count.
function Breakdown({ rows, counts, total }) {
  return (
    <ul className="space-y-3">
      {rows.map((row) => {
        const value = counts[row.key] || 0;
        const pct = total > 0 ? Math.round((value / total) * 100) : 0;
        return (
          <li key={row.key}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="text-ink">{row.label}</span>
              <span className="font-medium text-charcoal">{value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-cream">
              <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default async function AdminDashboardPage() {
  const session = await auth0.getSession();
  // Layout already redirects when there's no session — this is a defensive
  // fallback for the moment right after a failed/stale login attempt, where
  // getSession() can briefly disagree between the layout and page render.
  if (!session) {
    redirect("/auth/login");
  }
  const firstName = session.user.name?.split(" ")[0] || session.user.email;
  const stats = await getAdminDashboardStats();
  const { properties, regions, leads } = stats;
  const visibleRegions = regions.total - regions.hidden;

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl font-semibold text-charcoal">Bienvenido, {firstName}</h1>
      <p className="mb-8 text-sm text-muted">Resumen en tiempo real del sitio y del CRM.</p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          href="/admin/propiedades"
          label="Propiedades"
          value={properties.total}
          detail={`${properties.disponible} en el sitio · ${properties.featured} destacadas`}
        />
        <StatCard
          href="/admin/regiones"
          label="Regiones"
          value={regions.total}
          detail={regions.hidden > 0 ? `${visibleRegions} visibles · ${regions.hidden} ocultas` : "Todas visibles"}
        />
        <StatCard
          href="/admin/leads"
          label="Leads"
          value={leads.total}
          detail={`${leads.nuevo} sin atender · ${leads.last30} en 30 días`}
        />
        <StatCard
          href="/admin/documentos"
          label="Documentos e insights"
          value={stats.documents + stats.insights}
          detail={`${stats.documents} documentos · ${stats.insights} artículos`}
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Leads por estado</h2>
          {leads.total === 0 ? (
            <p className="text-sm text-muted">Aún no llegan leads de los formularios.</p>
          ) : (
            <Breakdown rows={LEAD_STATUSES} counts={leads} total={leads.total} />
          )}
        </Card>
        <Card>
          <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Propiedades por estado</h2>
          {properties.total === 0 ? (
            <p className="text-sm text-muted">Aún no hay propiedades.</p>
          ) : (
            <Breakdown rows={PROPERTY_STATUSES} counts={properties} total={properties.total} />
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-charcoal">Últimos leads</h2>
            <Link href="/admin/leads" className="text-sm text-brand-600 hover:underline">
              Ver todos
            </Link>
          </div>
          {stats.recentLeads.length === 0 ? (
            <p className="text-sm text-muted">Sin leads todavía.</p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.recentLeads.map((lead) => (
                <li key={lead._id} className="flex items-start justify-between gap-4 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-charcoal">
                      {[lead.name, lead.lastName].filter(Boolean).join(" ") || lead.email}
                    </p>
                    <p className="truncate text-muted">
                      {lead.property?.name?.es || lead.propertyName || lead.email}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-ink">
                      {LEAD_STATUSES.find((s) => s.key === (lead.status || "nuevo"))?.label || lead.status}
                    </p>
                    <p className="text-xs text-muted">{formatDate(lead.createdAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="mb-5 font-serif text-lg font-semibold text-charcoal">Actividad reciente</h2>
          {stats.recentActivity.length === 0 ? (
            <p className="text-sm text-muted">Aún no hay cambios registrados en el CRM.</p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.recentActivity.map((item) => (
                <li key={item._id} className="flex items-start justify-between gap-4 py-3 text-sm">
                  <p className="min-w-0 text-ink">
                    <span className="font-medium text-charcoal">{item.actorName}</span>{" "}
                    {ACTION_LABELS[item.action] || item.action} {ENTITY_LABELS[item.entityType] || ""}{" "}
                    <span className="font-medium text-charcoal">{item.entityLabel}</span>
                  </p>
                  <p className="shrink-0 text-xs text-muted">{formatDate(item.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
