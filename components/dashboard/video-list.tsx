import Link from 'next/link'
import { Film } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export type VideoRow = {
  id: string
  title: string
  niche: string | null
  status: string
  viral_score: number | null
  views: number | null
  created_at: string
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Brouillon',
  rendered: 'Rendu',
  published: 'Publié',
}

function scoreColor(score: number) {
  if (score >= 75) return 'text-chart-3'
  if (score >= 50) return 'text-accent'
  return 'text-muted-foreground'
}

export function VideoList({ videos }: { videos: VideoRow[] }) {
  if (videos.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-3 border-dashed border-border bg-card p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Film className="h-6 w-6" />
        </div>
        <div>
          <p className="font-medium">Aucune vidéo pour l’instant</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Générez votre premier script dramatique pour démarrer.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/generate">Générer une vidéo</Link>
        </Button>
      </Card>
    )
  }

  return (
    <Card className="divide-y divide-border border-border bg-card p-0">
      {videos.map((v) => (
        <div
          key={v.id}
          className="flex items-center gap-4 px-5 py-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm">
            🍓
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{v.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {v.niche ?? 'Drama'} ·{' '}
              {new Date(v.created_at).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="hidden text-right sm:block">
            <p className={`font-heading text-sm font-bold ${scoreColor(v.viral_score ?? 0)}`}>
              {v.viral_score ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Viral Score</p>
          </div>
          <Badge variant="secondary">
            {STATUS_LABELS[v.status] ?? v.status}
          </Badge>
        </div>
      ))}
    </Card>
  )
}
