import {
  BarChart3,
  Bot,
  Film,
  Mic,
  PenLine,
  Rocket,
} from 'lucide-react'
import { Card } from '@/components/ui/card'

const FEATURES = [
  {
    icon: PenLine,
    title: 'Moteur de scripts IA',
    desc: 'Hook puissant, conflit, trahison et twist final. Des scripts structurés pour la rétention maximale.',
  },
  {
    icon: Mic,
    title: 'Voix storytelling',
    desc: 'Synthèse vocale émotionnelle en français qui donne vie au drama de chaque personnage.',
  },
  {
    icon: Film,
    title: 'Rendu vidéo 9:16',
    desc: 'Vidéos verticales optimisées TikTok et Shorts, audio synchronisé et export MP4 propre.',
  },
  {
    icon: BarChart3,
    title: 'Viral Score AI',
    desc: 'Un score de 0 à 100 qui prédit le potentiel viral et optimise vos prochaines vidéos.',
  },
  {
    icon: Bot,
    title: 'Bot 24/7',
    desc: 'Génération continue en pipeline, priorité aux abonnés premium et retry automatique.',
  },
  {
    icon: Rocket,
    title: 'Publication',
    desc: 'Connexion TikTok Content API ou upload assisté pour publier en un clic.',
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Une usine à contenu viral, entièrement automatisée
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-pretty">
          De l’idée au MP4 prêt à publier, chaque étape est gérée par l’IA.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card
            key={f.title}
            className="border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
