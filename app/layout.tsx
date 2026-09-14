import type { Metadata } from "next";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";
import { GoogleAnalytics } from "@next/third-parties/google";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "LaunchPath Labs | 12-Week Founder Accelerator South Africa",
    template: "%s | LaunchPath Labs"
  },
  description: siteConfig.description,
  robots:
    process.env.VERCEL_ENV === "preview"
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: siteConfig.name,
    title: "LaunchPath Labs",
    description: siteConfig.description,
    images: [{ url: "/launchpath-social.png", width: 1200, height: 630, alt: "LaunchPath Labs" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchPath Labs",
    description: siteConfig.description,
    images: ["/launchpath-social.png"]
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export const metadata = {
  title: "LaunchPath Recruitment",
  description: "AI-Powered Recruitment and Job Readiness Platform",
  icons: {
    icon: "/icon.png",
  },
  verification: {
    google: "iRvE4kw0JqCBgqSbF94O2MnA3AEvflXSUDvdYVCx9YM",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.baseUrl,
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cape Town",
          addressCountry: "ZA"
        },
        logo: `${siteConfig.baseUrl}/launchpath-logo.png`
      },
      {
        "@type": "Course",
        name: "LaunchPath Labs 12-Week Founder Accelerator",
        description: siteConfig.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          sameAs: siteConfig.baseUrl
        },
        educationalLevel: "Early-stage founder accelerator",
        courseMode: "Online",
        offers: {
          "@type": "Offer",
          price: siteConfig.pricing.foundingCohortFee,
          priceCurrency: "ZAR",
          availability: siteConfig.cohort.applicationsOpen ? "https://schema.org/InStock" : "https://schema.org/PreOrder"
        }
      }
    ]
  };

  return (
    <html lang="en-ZA">
      <body className={poppins.className}>
        <Link
          href="#main"
          className="focus-ring sr-only rounded-md bg-lime px-4 py-3 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </Link>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-CGNB2H2D8P" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
