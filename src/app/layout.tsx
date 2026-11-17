import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/globals.css";
import "../../styles/custom.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../../styles/design-system.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickContact from "@/components/QuickContact";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

export const viewport: Viewport = {
  themeColor: "#123B5D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        {/* ✅ Google Search Console Verification */}
        <meta name="google-site-verification" content="ElursTQ7VyzXcjb3RB3t1CLDA77OycdQ3TJImNTYBAk" />

        {/* Enables scroll-reveal styles only when JS + IntersectionObserver are available */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if('IntersectionObserver' in window){document.documentElement.classList.add('ds-js')}",
          }}
        />

        {/* ✅ Google Analytics Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EF7H9HEGVC"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EF7H9HEGVC');
          `}
        </Script>
      </head>
      <body>
        <a href="#main-content" className="ds-skip">Skip to main content</a>
        <Header />
        <main id="main-content" className="ds-main" tabIndex={-1}>{children}</main>
        <Footer />
        <QuickContact />
        <Reveal />
      </body>
    </html>
  );
}
