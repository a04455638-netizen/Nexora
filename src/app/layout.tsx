import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexora.uz";
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "GOOGLE_VERIFICATION_CODE";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexora — Zamonaviy texnika va elektronika onlayn do'koni",
    template: "%s | Nexora — Texnika va Elektronika",
  },
  description:
    "Nexora — Smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda. Rasmiy kafolat va O'zbekiston bo'ylab tez yetkazib berish!",
  keywords: [
    "Nexora",
    "Nexora uz",
    "Nexora texnika",
    "Nexora market",
    "elektronika do'koni",
    "smartfonlar",
    "noutbuklar",
    "maishiy texnika",
    "Toshkent texnika do'koni",
  ],
  authors: [{ name: "Nexora Official", url: siteUrl }],
  creator: "Nexora",
  publisher: "Nexora",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nexora — Zamonaviy texnika va elektronika onlayn do'koni",
    description:
      "Nexora — Smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda. Rasmiy kafolat va O'zbekiston bo'ylab tez yetkazib berish!",
    url: siteUrl,
    siteName: "Nexora",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexora — Zamonaviy texnika va elektronika do'koni",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — Zamonaviy texnika va elektronika onlayn do'koni",
    description:
      "Nexora — Smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda.",
    images: ["/og-image.png"],
    creator: "@nexora_uz",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: googleVerification,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "ElectronicsStore", "Store"],
      "@id": `${siteUrl}/#organization`,
      name: "Nexora",
      alternateName: ["Nexora texnika", "Nexora uz", "Nexora market", "NEXORA Store"],
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      image: `${siteUrl}/favicon.svg`,
      description:
        "Nexora — Smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda. Rasmiy kafolat va O'zbekiston bo'ylab tez yetkazib berish!",
      telephone: "+998-71-200-00-00",
      priceRange: "UZS",
      currenciesAccepted: "UZS",
      paymentAccepted: "Cash, Credit Card, Click, Payme",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Chilonzor tumani",
        addressLocality: "Toshkent",
        addressRegion: "Toshkent",
        postalCode: "100000",
        addressCountry: "UZ",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.2995,
        longitude: 69.2401,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
      sameAs: [
        "https://t.me/nexora_uz",
        "https://instagram.com/nexora_uz",
        "https://facebook.com/nexora_uz",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Nexora",
      alternateName: ["Nexora texnika", "Nexora uz"],
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/products?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} min-h-screen flex flex-col font-sans bg-[#0A0A0A] text-zinc-100 antialiased`}
      >
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
