import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nexora — Zamonaviy texnika va elektronika onlayn do'koni";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(118, 185, 0, 0.15) 0%, transparent 60%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "60px",
          border: "2px solid #222",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* Geometric N Logo */}
          <div
            style={{
              width: "72px",
              height: "72px",
              backgroundColor: "#141414",
              borderRadius: "18px",
              border: "2px solid #76B900",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(118, 185, 0, 0.4)",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8V32L17 24V8L8 8Z"
                fill="#76B900"
              />
              <path
                d="M17 19.5L25 32H32L21 16L17 19.5Z"
                fill="#76B900"
              />
              <path
                d="M23 8V18L32 8H23Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
          <span
            style={{
              fontSize: "64px",
              fontWeight: "900",
              letterSpacing: "4px",
              color: "#FFFFFF",
            }}
          >
            NEXORA
          </span>
        </div>

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.25,
            color: "#FFFFFF",
            margin: "0 0 20px 0",
          }}
        >
          Zamonaviy texnika va elektronika onlayn do'koni
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#A0A0A0",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            margin: "0 0 36px 0",
          }}
        >
          Smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda.
          Rasmiy kafolat va O'zbekiston bo'ylab tez yetkazib berish!
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            padding: "12px 28px",
            backgroundColor: "rgba(118, 185, 0, 0.12)",
            border: "1px solid #76B900",
            borderRadius: "9999px",
            color: "#76B900",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          <span>nexora.uz</span>
          <span style={{ color: "#444" }}>•</span>
          <span>Rasmiy kafolat</span>
          <span style={{ color: "#444" }}>•</span>
          <span>200+ Mahsulotlar</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
