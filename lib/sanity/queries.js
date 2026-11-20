import { sanityClient } from "./client";
import { sanityWriteClient } from "./writeClient";

// Only ever surface properties that are public — "reservado"/"vendido" stay
// editable in the CRM but drop off the public site and public map.
const PUBLIC_STATUS_FILTER = `status == "disponible"`;

// Resolves image/file references to their actual CDN URL right in the query,
// so callers never need a separate image-url builder for the common case.
const OPPORTUNITY_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  featured,
  order,
  status,
  "region": region->{ _id, name, "slug": slug.current },
  "image": image{ "url": asset->url },
  "gallery": gallery[]{ "url": asset->url },
  city,
  surface,
  vocation,
  briefDescription,
  availability,
  advantages,
  reasons,
  developmentPotential,
  "techSheet": techSheet{ "url": asset->url, "filename": asset->originalFilename },
  "mapImage": mapImage{ "url": asset->url },
  distances,
  coordinates,
  locationPrecision,
  "documents": documents[]{ label, "url": file.asset->url },
  customFields
}`;

export async function getPublicOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && ${PUBLIC_STATUS_FILTER}] | order(order asc) ${OPPORTUNITY_PROJECTION}`
  );
}

export async function getFeaturedOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && featured == true && ${PUBLIC_STATUS_FILTER}] | order(order asc) ${OPPORTUNITY_PROJECTION}`
  );
}

export async function getOpportunityBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "opportunity" && slug.current == $slug][0] ${OPPORTUNITY_PROJECTION}`,
    { slug }
  );
}

// Every property with coordinates, for the public interactive map — includes
// all public (non-hidden) statuses so "reservado" can still show on the map
// if the business wants that later; for now this matches PUBLIC_STATUS_FILTER.
export async function getMapOpportunities() {
  return sanityClient.fetch(
    `*[_type == "opportunity" && ${PUBLIC_STATUS_FILTER} && defined(coordinates)] ${OPPORTUNITY_PROJECTION}`
  );
}

// Regions are public unless an admin switched them off ("Visible en el
// sitio" in the CRM). Written as !(hidden == true) so regions saved before the
// field existed — where it's simply undefined — stay visible.
const PUBLIC_REGION_FILTER = `!(hidden == true)`;

const REGION_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  description,
  advantages,
  "heroImage": heroImage{ "url": asset->url },
  "mapImage": mapImage{ "url": asset->url },
  order,
  hidden
}`;

export async function getRegions() {
  return sanityClient.fetch(`*[_type == "region" && ${PUBLIC_REGION_FILTER}] | order(order asc) ${REGION_PROJECTION}`);
}

export async function getRegionBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "region" && slug.current == $slug && ${PUBLIC_REGION_FILTER}][0] ${REGION_PROJECTION}`,
    { slug }
  );
}

export async function getSiteContent() {
  return sanityClient.fetch(`*[_type == "siteContent"][0]`);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

// --- Admin (server-only, uncached) --------------------------------------
// The admin panel reads through the write client instead of the public CDN
// client so staff see their own edits immediately, and so every status
// (not just "disponible") is visible.

const ADMIN_LIST_PROJECTION = `{
  _id,
  name,
  "slug": slug.current,
  status,
  surface,
  featured,
  "region": region->{ _id, name },
  _updatedAt
}`;

export async function getAdminOpportunities() {
  return sanityWriteClient.fetch(
    `*[_type == "opportunity"] | order(_updatedAt desc) ${ADMIN_LIST_PROJECTION}`
  );
}

// Every property with coordinates, any status — the CRM's own map view, so
// staff can see reserved/sold pins too (unlike the public map).
export async function getAdminMapOpportunities() {
  return sanityWriteClient.fetch(`*[_type == "opportunity" && defined(coordinates)] ${OPPORTUNITY_PROJECTION}`);
}

export async function getAdminOpportunityById(id) {
  return sanityWriteClient.fetch(`*[_type == "opportunity" && _id == $id][0] ${OPPORTUNITY_PROJECTION}`, {
    id,
  });
}

export async function getAdminRegions() {
  return sanityWriteClient.fetch(`*[_type == "region"] | order(order asc) { _id, name }`);
}

export async function getAdminRegionsWithCounts() {
  return sanityWriteClient.fetch(
    `*[_type == "region"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      "heroImage": heroImage{ "url": asset->url },
      hidden,
      "propertyCount": count(*[_type == "opportunity" && references(^._id)])
    }`
  );
}

export async function getAdminRegionById(id) {
  return sanityWriteClient.fetch(`*[_type == "region" && _id == $id][0] ${REGION_PROJECTION}`, { id });
}

const LEAD_PROJECTION = `{
  _id,
  formType,
  status,
  name,
  lastName,
  email,
  phone,
  propertyName,
  "property": property->{ name },
  message,
  createdAt
}`;

export async function getAdminLeads() {
  return sanityWriteClient.fetch(`*[_type == "lead"] | order(createdAt desc) ${LEAD_PROJECTION}`);
}

const DOCUMENT_PROJECTION = `{
  _id,
  title,
  type,
  "file": file{ "url": asset->url, "filename": asset->originalFilename },
  uploadedAt
}`;

// Public — shown on a property/region's own page (Sanity's file assets are
// served over a public, unguessable-but-unauthenticated CDN URL either way).
export async function getPropertyDocuments(propertyId) {
  if (!propertyId) return [];
  return sanityClient.fetch(
    `*[_type == "siteDocument" && property._ref == $propertyId] | order(uploadedAt desc) ${DOCUMENT_PROJECTION}`,
    { propertyId }
  );
}

export async function getRegionDocuments(regionId) {
  if (!regionId) return [];
  return sanityClient.fetch(
    `*[_type == "siteDocument" && region._ref == $regionId] | order(uploadedAt desc) ${DOCUMENT_PROJECTION}`,
    { regionId }
  );
}

export async function getAdminDocuments() {
  return sanityWriteClient.fetch(
    `*[_type == "siteDocument"] | order(uploadedAt desc) {
      _id,
      title,
      type,
      "property": property->{ _id, name },
      "region": region->{ _id, name },
      "file": file{ "url": asset->url, "filename": asset->originalFilename },
      uploadedAt
    }`
  );
}

// --- Insights ------------------------------------------------------------

const INSIGHT_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  category,
  date,
  excerpt,
  content,
  "image": image{ "url": asset->url }
}`;

export async function getPublicInsights() {
  return sanityClient.fetch(`*[_type == "insight"] | order(date desc) ${INSIGHT_PROJECTION}`);
}

export async function getInsightBySlug(slug) {
  return sanityClient.fetch(`*[_type == "insight" && slug.current == $slug][0] ${INSIGHT_PROJECTION}`, { slug });
}

export async function getAdminInsights() {
  return sanityWriteClient.fetch(`*[_type == "insight"] | order(date desc) ${INSIGHT_PROJECTION}`);
}

export async function getAdminInsightById(id) {
  return sanityWriteClient.fetch(`*[_type == "insight" && _id == $id][0] ${INSIGHT_PROJECTION}`, { id });
}

// --- Dashboard -------------------------------------------------------------

// Everything the admin Dashboard shows, in one round trip.
export async function getAdminDashboardStats() {
  return sanityWriteClient.fetch(`{
    "properties": {
      "total": count(*[_type == "opportunity"]),
      "disponible": count(*[_type == "opportunity" && status == "disponible"]),
      "reservado": count(*[_type == "opportunity" && status == "reservado"]),
      "vendido": count(*[_type == "opportunity" && status == "vendido"]),
      "oculto": count(*[_type == "opportunity" && status == "oculto"]),
      "featured": count(*[_type == "opportunity" && featured == true && status == "disponible"])
    },
    "regions": {
      "total": count(*[_type == "region"]),
      "hidden": count(*[_type == "region" && hidden == true])
    },
    "leads": {
      "total": count(*[_type == "lead"]),
      "nuevo": count(*[_type == "lead" && (status == "nuevo" || !defined(status))]),
      "contactado": count(*[_type == "lead" && status == "contactado"]),
      "seguimiento": count(*[_type == "lead" && status == "seguimiento"]),
      "cerrado": count(*[_type == "lead" && status == "cerrado"]),
      "descartado": count(*[_type == "lead" && status == "descartado"]),
      "last30": count(*[_type == "lead" && dateTime(createdAt) > dateTime(now()) - 60*60*24*30])
    },
    "documents": count(*[_type == "siteDocument"]),
    "insights": count(*[_type == "insight"]),
    "recentLeads": *[_type == "lead"] | order(createdAt desc)[0...5]{
      _id, name, lastName, email, status, createdAt, propertyName,
      "property": property->{ name }
    },
    "recentActivity": *[_type == "activityLog"] | order(createdAt desc)[0...8]{
      _id, actorName, action, entityType, entityLabel, createdAt
    }
  }`);
}

// Last time each person did something in the CRM, keyed by email — used by
// the Usuarios page to show who is actually active.
export async function getAdminActivityByActor() {
  return sanityWriteClient.fetch(
    `*[_type == "activityLog" && defined(actorEmail) && actorEmail != ""] | order(createdAt desc)[0...500]{
      actorEmail, actorName, createdAt
    }`
  );
}
