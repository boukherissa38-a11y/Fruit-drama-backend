import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        </div>
        <h2 className="mx-auto max-w-2xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Prêt à lancer votre première vidéo virale ?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground text-pretty">
          Rejoignez les créateurs qui automatisent leur contenu avec Fruit
          Drama AI Factory.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/auth/sign-up">Commencer gratuitement</Link>
        </Button>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Fruit Drama AI Factory. Tous droits
          réservés.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="/pricing" className="hover:text-foreground">
            Tarifs
          </Link>
          <Link href="/auth/login" className="hover:text-foreground">
            Connexion
          </Link>
        </div>
      </div>
    </footer>
  )
}
