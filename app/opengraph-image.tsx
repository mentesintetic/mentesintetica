import { ImageResponse } from "next/og";

export const alt = "Mente Sintética — Automação e Inteligência Artificial para Negócios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0A0A09", color: "#F4EFE6", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="56" viewBox="0 0 48 40">
            <polygon points="2,38 9,38 17,16 10,16" fill="#F5A70F" />
            <polygon points="15,38 22,38 34,6 27,6" fill="#F5A70F" />
            <polygon points="28,38 35,38 46,14 39,14" fill="#F5A70F" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4 }}>MENTE SINTÉTICA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          <div>Menos trabalho repetitivo.</div>
          <div style={{ color: "#F5A70F", fontStyle: "italic" }}>Mais crescimento.</div>
        </div>
        <div style={{ fontSize: 28, color: "#A8A196" }}>Automação de processos · Assistentes de IA · mentesintetica.com.br</div>
      </div>
    ),
    size
  );
}
