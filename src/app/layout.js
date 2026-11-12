import { Anton, Inter, Alex_Brush, Space_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/portfolio";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: siteConfig.fullTitle,
  description: siteConfig.description,
  keywords: [
    "Anshad",
    "Freelance SEO Specialist",
    "SEO Specialist in Ernakulam",
    "SEO Expert Kerala",
    "Freelance Digital Marketer Ernakulam",
    "Search Engine Optimization",
    "Content Marketing",
    "Google Ads",
    "Digital Strategy",
  ],
  authors: [{ name: "Anshad" }],
  creator: "Anshad",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.fullTitle,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: "Anshad — SEO Specialist",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.profileImage,
        width: 1080,
        height: 1350,
        alt: "Anshad — Freelance SEO Specialist from Ernakulam, Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullTitle,
    description: siteConfig.description,
    images: [siteConfig.profileImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        name: "Anshad",
        jobTitle: "Freelance SEO Specialist",
        description: siteConfig.description,
        url: siteConfig.siteUrl,
        image: `${siteConfig.siteUrl}${siteConfig.profileImage}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ernakulam",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        knowsAbout: [
          "Search Engine Optimization",
          "Content Marketing",
          "Google Ads",
          "Social Media Management",
          "Email Marketing",
          "Digital Strategy",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.siteUrl}/#service`,
        name: "Anshad — Freelance SEO & Digital Marketing",
        description: siteConfig.description,
        url: siteConfig.siteUrl,
        provider: {
          "@id": `${siteConfig.siteUrl}/#person`,
        },
        areaServed: [
          {
            "@type": "City",
            name: "Ernakulam",
          },
          {
            "@type": "State",
            name: "Kerala",
          },
          {
            "@type": "Country",
            name: "India",
          },
        ],
        serviceType: [
          "Search Engine Optimization",
          "Content Marketing",
          "Google Ads",
          "Social Media Management",
          "Email Marketing",
          "Digital Strategy",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} ${alexBrush.variable} ${spaceMono.variable}`}
    >
      <body className="bg-[#080808] font-sans text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}

