import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700", "800"], style: ["normal", "italic"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const title = "Mente Sintética — Automação e Inteligência Artificial para Negócios";
const description =
  "Automação de processos, assistentes de IA e experiências digitais sob medida. Menos trabalho repetitivo, mais crescimento. Diagnóstico gratuito pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Mente Sintética" },
  description,
  applicationName: "Mente Sintética",
  keywords: ["automação de processos", "inteligência artificial", "assistente de IA", "chatbot WhatsApp", "automação para empresas", "Mente Sintética", "mentesintetica"],
  authors: [{ name: "Mente Sintética", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Mente Sintética",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0A0A09", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
