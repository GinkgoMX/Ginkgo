import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import { getRole, ROLES } from "@/lib/auth/roles";
import { isManagementConfigured, listAuth0Users, auth0DashboardUsersUrl } from "@/lib/auth/auth0Management";
import { getAdminActivityByActor } from "@/lib/sanity/queries";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export const metadata = { title: "Usuarios" };
export const dynamic = "force-dynamic";

const ROLE_INFO = [
  {
    key: ROLES.ADMIN,
    label: "Administrador",
    desc: "Todo el CRM, incluidos Usuarios y Configuración.",
    badge: "bg-brand-600 text-white",
  },
  {
    key: ROLES.ASSISTANT,
    label: "Asistente",
    desc: "Leads, propiedades, regiones, mapas, documentos, insights y contenido. Sin Usuarios ni Configuración.",
    badge: "bg-brand-50 text-brand-700",
  },
  {
    key: ROLES.VIEWER,
    label: "Solo lectura",
    desc: "Rol reservado; hoy entra al panel pero no puede guardar cambios.",
    badge: "bg-border text-muted",
  },
];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Mexico_City",
  });
}

function RoleBadge({ role }) {
  const info = ROLE_INFO.find((r) => r.key === role);
  if (!info) {
    return (
      <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600" title="Sin app_metadata.role: no puede entrar al panel">
        Sin rol
      </span>
    );
  }
  return <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${info.badge}`}>{info.label}</span>;
}

async function loadUsers() {
  if (!isManagementConfigured()) return { users: null, error: null };
  try {
    return { users: await listAuth0Users(), error: null };
  } catch (error) {
    return { users: null, error: error.message };
  }
}

export default async function UsuariosPage() {
  const session = await auth0.getSession();
  if (getRole(session) !== ROLES.ADMIN) {
    redirect("/admin");
  }

  const [{ users, error }, activity] = await Promise.all([loadUsers(), getAdminActivityByActor()]);

  // Most recent CRM change per email (activity is already newest-first).
  const lastChangeByEmail = {};
  for (const entry of activity) {
    const key = entry.actorEmail.toLowerCase();
    if (!lastChangeByEmail[key]) lastChangeByEmail[key] = entry.createdAt;
  }

  const dashboardUrl = auth0DashboardUsersUrl();

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-charcoal">Usuarios</h1>
        <Button href={dashboardUrl} variant="outline" size="sm" target="_blank" rel="noopener noreferrer">
          Administrar en Auth0 ↗
        </Button>
      </div>
      <p className="mb-8 max-w-3xl text-sm text-muted">
        El acceso al CRM lo gestiona Auth0: ahí se crean las cuentas, se restablecen contraseñas y se bloquea a
        alguien. El rol de cada persona es el campo <code className="rounded bg-cream px-1">role</code> de su{" "}
        <code className="rounded bg-cream px-1">app_metadata</code> (<code className="rounded bg-cream px-1">admin</code>,{" "}
        <code className="rounded bg-cream px-1">assistant</code> o <code className="rounded bg-cream px-1">viewer</code>
        ). Los cambios de rol se aplican la siguiente vez que la persona inicia sesión.
      </p>

      <Card className="mb-8 overflow-hidden p-0">
        {users ? (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-cream/60 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-6 py-3">Usuario</th>
                <th className="px-6 py-3">Rol</th>
                <th className="px-6 py-3">Último acceso</th>
                <th className="px-6 py-3">Último cambio en el CRM</th>
                <th className="px-6 py-3 text-right">Accesos</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4">
                    <p className="font-medium text-charcoal">
                      {u.name && u.name !== u.email ? u.name : u.email}
                      {u.email === session.user.email && <span className="ml-2 text-xs text-muted">(tú)</span>}
                    </p>
                    {u.name && u.name !== u.email && <p className="text-muted">{u.email}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <RoleBadge role={u.role} />
                      {u.blocked && (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-600">Bloqueado</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink">{formatDate(u.lastLogin)}</td>
                  <td className="px-6 py-4 text-ink">{formatDate(lastChangeByEmail[u.email?.toLowerCase()])}</td>
                  <td className="px-6 py-4 text-right text-ink">{u.loginsCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-6 md:p-8">
            {error ? (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            ) : (
              <p className="mb-4 text-sm text-ink">
                Para ver aquí la lista de usuarios, conecta el panel a la API de administración de Auth0 (solo lectura):
              </p>
            )}
            <ol className="list-decimal space-y-2 pl-5 text-sm text-ink">
              <li>
                Auth0 → Applications → <strong>Create Application</strong> → tipo <strong>Machine to Machine</strong>{" "}
                (p. ej. “Ginkgo CRM – lectura de usuarios”).
              </li>
              <li>
                Autorízala para <strong>Auth0 Management API</strong> con un solo permiso:{" "}
                <code className="rounded bg-cream px-1">read:users</code>.
              </li>
              <li>
                Copia su Client ID y Client Secret a <code className="rounded bg-cream px-1">AUTH0_MGMT_CLIENT_ID</code> y{" "}
                <code className="rounded bg-cream px-1">AUTH0_MGMT_CLIENT_SECRET</code> (en <code>.env.local</code> y en
                Vercel) y reinicia el servidor.
              </li>
            </ol>
            <p className="mt-4 text-sm text-muted">
              Mientras tanto, tu sesión actual: <strong className="text-charcoal">{session.user.email}</strong> —{" "}
              <RoleBadge role={getRole(session)} />
            </p>
          </div>
        )}
      </Card>

      <h2 className="mb-4 font-serif text-lg font-semibold text-charcoal">Roles</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ROLE_INFO.map((r) => (
          <Card key={r.key}>
            <div className="mb-2 flex items-center gap-2">
              <RoleBadge role={r.key} />
              <code className="text-xs text-muted">{r.key}</code>
            </div>
            <p className="text-sm text-ink">{r.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
