import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Fonctionnalités
          </Link>
          <Link
            href="/#how"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Comment ça marche
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Tarifs
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link href="/auth/login">Connexion</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/sign-up">Démarrer</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
