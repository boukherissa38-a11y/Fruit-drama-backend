import Image from 'next/image'
import Link from 'next/link'
import { Play, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[320px] w-[320px] rounded-full bg-accent/15 blur-[120px]" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Génération de vidéos virales par IA
          </div>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Transformez le drama des fruits en vues{' '}
            <span className="text-primary">virales</span>.
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Fruit Drama AI Factory génère automatiquement des scripts
            dramatiques, des voix émotionnelles et des vidéos verticales prêtes
            pour TikTok et YouTube Shorts. En quelques secondes.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/auth/sign-up">
                <Zap className="h-4 w-4" />
                Générer ma première vidéo
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/#how">
                <Play className="h-4 w-4" />
                Voir comment ça marche
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
            <div>
              <span className="block font-heading text-xl font-bold text-foreground">
                12M+
              </span>
              vues générées
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block font-heading text-xl font-bold text-foreground">
                40s
              </span>
              par vidéo
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="block font-heading text-xl font-bold text-foreground">
                4
              </span>
              personnages
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <Image
              src="/characters/cast.png"
              alt="Les quatre personnages fruits du casting Fruit Drama"
              width={800}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
