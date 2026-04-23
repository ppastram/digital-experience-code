import type { Metadata } from "next"
import { LanguageProvider } from "@/lib/language-context"
import { MobileMenuProvider } from "@/lib/mobile-menu-context"
import { DisclaimerBanner } from "@/components/layout/disclaimer-banner"
import { Header } from "@/components/layout/header"
import { RtlWrapper } from "@/components/layout/rtl-wrapper"
import { ContentLayout } from "@/components/layout/content-layout"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Emirates Code — Digital Experience",
  description: "Browse and explore the Emirates Code for Government Services",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&family=Noto+Kufi+Arabic:wght@400;500;600;700&family=Alexandria:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          <MobileMenuProvider>
            <RtlWrapper>
              <div className="min-h-screen flex flex-col">
                <DisclaimerBanner />
                <Header />
                <ContentLayout>
                  {children}
                </ContentLayout>
              </div>
            </RtlWrapper>
          </MobileMenuProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
