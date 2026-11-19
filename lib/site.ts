/**
 * Endereço público do site. Ordem de preferência:
 * 1. NEXT_PUBLIC_SITE_URL (defina na Vercel quando o domínio .com.br estiver ativo, se quiser forçar)
 * 2. Domínio de produção que a Vercel informa automaticamente no build
 * 3. Domínio oficial
 * Assim a prévia do link (WhatsApp/Instagram) sempre aponta para um endereço que funciona.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://mentesintetica.com.br");
export const WHATSAPP_NUMBER = "5531986431644";
export const WHATSAPP_DISPLAY = "(31) 98643-1644";
export const INSTAGRAM = "@mente.sintetic";

export function whatsappLink(message = "Olá! Vim pelo site da Mente Sintética e quero automatizar minha operação.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
