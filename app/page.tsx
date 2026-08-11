import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { Features } from '@/components/site/features'
import { HowItWorks } from '@/components/site/how-it-works'
import { CtaSection, SiteFooter } from '@/components/site/cta-footer'

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />
      <Hero />
      <Features />
      <HowItWorks />
      <CtaSection />
      <SiteFooter />
    </main>
  )
}
