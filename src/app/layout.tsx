import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecostech.ng"),
  title: {
    default: "ECOSTECH: ICT Capacity Training for Nigerian Universities",
    template: "%s | ECOSTECH",
  },
  description:
    "ECOSTECH trains ICT units inside Nigerian federal universities to run virtual lectures, manage their own WordPress site, and schedule CBT exams in-house: hands-on, cohort-based, and built for the realities of campus IT.",
  openGraph: {
    title: "ECOSTECH: ICT Capacity Training for Nigerian Universities",
    description:
      "Hands-on ICT training for university staff: video & content creation, WordPress for school sites, CBT exam scheduling, and more.",
    url: "https://ecostech.ng",
    siteName: "ECOSTECH",
    locale: "en_NG",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSans.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink antialiased">
        <a href="#main" className="skip-link t-ui">
          Skip to content
        </a>
        <SmoothScrollProvider>
          <SiteNav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
