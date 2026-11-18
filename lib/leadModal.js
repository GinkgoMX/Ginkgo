// Shared between the modal and every button that opens it, kept in a tiny
// module so buttons don't pull the whole form into their bundle.
export const OPEN_LEAD_MODAL_EVENT = "ginkgo:open-lead-modal";

// A link to any page with one of these hashes opens the modal on arrival,
// e.g. "/es#solicitar-informacion" from an email or an Instagram bio.
export const LEAD_MODAL_HASHES = ["#solicitar-informacion", "#request-information"];

export function openLeadModal() {
  window.dispatchEvent(new Event(OPEN_LEAD_MODAL_EVENT));
}
