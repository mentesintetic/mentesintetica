export const SITE_URL = "https://mentesintetica.com.br";
export const WHATSAPP_NUMBER = "5531986431644";
export const WHATSAPP_DISPLAY = "(31) 98643-1644";
export const INSTAGRAM = "@mente.sintetic";

export function whatsappLink(message = "Olá! Vim pelo site da Mente Sintética e quero automatizar minha operação.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
