import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/cta-footer'
import { PricingCards } from '@/components/site/pricing-cards'

export default function PricingPage() {
  return (
    <main className="min-h-dvh">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Des tarifs pour chaque créateur
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Commencez gratuitement, passez à la vitesse supérieure quand vos
            vues décollent. Paiement sécurisé via Stripe et PayPal.
          </p>
        </div>
        <PricingCards />
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Tous les plans incluent les 4 personnages fruits et l’export 9:16.
        </p>
      </section>
      <SiteFooter />
    </main>
  )
}
