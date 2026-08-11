import Link from 'next/link'
import { Eye, Film, Flame, TrendingUp } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/shell'
import { StatCard } from '@/components/dashboard/stat-card'
import { VideoList, type VideoRow } from '@/components/dashboard/video-list'
import { Button } from '@/components/ui/button'
import { getSessionProfile } from '@/lib/get-profile'

export default async function DashboardPage() {
  const { supabase, profile } = await getSessionProfile()

  const { data: videos } = await supabase
    .from('videos')
    .select('id, title, niche, status, viral_score, views, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const rows = (videos ?? []) as VideoRow[]

  const { count: totalVideos } = await supabase
    .from('videos')
    .select('*', { count: 'exact', head: true })

  const totalViews = rows.reduce((acc, v) => acc + (v.views ?? 0), 0)
  const avgScore =
    rows.length > 0
      ? Math.round(
          rows.reduce((acc, v) => acc + (v.viral_score ?? 0), 0) / rows.length,
        )
      : 0

  const firstName = profile.full_name?.split(' ')[0] ?? 'créateur'

  return (
    <DashboardShell title="Vue d’ensemble" profile={profile}>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">
          Bonjour {firstName} 👋
        </h2>
        <p className="text-muted-foreground">
          Voici l’état de votre usine à drama viral.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Vidéos créées"
          value={String(totalVideos ?? 0)}
          icon={Film}
        />
        <StatCard
          label="Vues totales"
          value={totalViews.toLocaleString('fr-FR')}
          icon={Eye}
        />
        <StatCard
          label="Viral Score moyen"
          value={String(avgScore)}
          icon={Flame}
          hint="sur 100"
        />
        <StatCard
          label="Crédits"
          value={profile.plan === 'free' ? String(profile.credits) : '∞'}
          icon={TrendingUp}
          hint={profile.plan === 'free' ? 'plan gratuit' : `plan ${profile.plan}`}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold">Vidéos récentes</h3>
        <Button asChild variant="ghost" size="sm">
          <Link href="/library">Tout voir</Link>
        </Button>
      </div>
      <div className="mt-4">
        <VideoList videos={rows} />
      </div>
    </DashboardShell>
  )
}
