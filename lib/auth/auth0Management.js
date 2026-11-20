import "server-only";

// Read-only access to the Auth0 Management API, for the admin Usuarios page.
//
// Needs a separate Machine-to-Machine application in Auth0 (the login app's
// own credentials can't call the Management API), authorized for the
// "Auth0 Management API" with only the `read:users` scope:
//   AUTH0_MGMT_CLIENT_ID, AUTH0_MGMT_CLIENT_SECRET
// AUTH0_DOMAIN is shared with the login app.

function domain() {
  return (process.env.AUTH0_DOMAIN || "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export function isManagementConfigured() {
  return Boolean(domain() && process.env.AUTH0_MGMT_CLIENT_ID && process.env.AUTH0_MGMT_CLIENT_SECRET);
}

// Cached for the life of the server instance; Auth0 M2M tokens last 24 h by
// default and every token request counts against the tenant's M2M quota.
let cachedToken = null;

async function getManagementToken() {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }
  const res = await fetch(`https://${domain()}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_MGMT_CLIENT_ID,
      client_secret: process.env.AUTH0_MGMT_CLIENT_SECRET,
      audience: `https://${domain()}/api/v2/`,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`Auth0 rechazó las credenciales de la API de administración (${res.status}: ${body.error_description || body.error || "sin detalle"}).`);
  }
  const data = await res.json();
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

// Every user in the tenant (first 100 — far more than this team will have).
export async function listAuth0Users() {
  const token = await getManagementToken();
  const params = new URLSearchParams({
    per_page: "100",
    sort: "created_at:1",
    fields: "user_id,name,email,picture,app_metadata,last_login,logins_count,created_at,blocked",
    include_fields: "true",
  });
  const res = await fetch(`https://${domain()}/api/v2/users?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      res.status === 403
        ? "La aplicación M2M no tiene el permiso read:users en la Auth0 Management API."
        : `No se pudo leer la lista de usuarios de Auth0 (${res.status}: ${body.message || "sin detalle"}).`
    );
  }
  const users = await res.json();
  return users.map((u) => ({
    id: u.user_id,
    name: u.name,
    email: u.email,
    picture: u.picture,
    role: u.app_metadata?.role || null,
    lastLogin: u.last_login || null,
    loginsCount: u.logins_count || 0,
    createdAt: u.created_at,
    blocked: Boolean(u.blocked),
  }));
}

// Link into the Auth0 dashboard's Users screen for this tenant, so admins can
// jump straight to where users are actually created and edited.
export function auth0DashboardUsersUrl() {
  const match = /^([^.]+)\.([a-z]{2})\.auth0\.com$/.exec(domain());
  if (!match) return "https://manage.auth0.com/";
  const [, tenant, region] = match;
  return `https://manage.auth0.com/dashboard/${region}/${tenant}/users`;
}
