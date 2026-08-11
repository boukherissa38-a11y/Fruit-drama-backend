import { Eye, MousePointerClick, Timer, TrendingUp } from 'lucide-react'
import { DashboardShell } from '@/components/dashboard/shell'
import { StatCard } from '@/components/dashboard/stat-card'
import {
  ScoreChart,
  ViewsChart,
} from '@/components/dashboard/analytics-charts'
import { getSessionProfile } from '@/lib/get-profile'

type MetricRow = {
  title: string
  viral_score: number | null
  views: number | null
  watch_time_sec: number | null
  retention: number | null
  ctr: number | null
  created_at: string
}

export default async function AnalyticsPage() {
  const { supabase, profile } = await getSessionProfile()

  const { data } = await supabase
    .from('videos')
    .select(
      'title, viral_score, views, watch_time_sec, retention, ctr, created_at',
    )
    .order('created_at', { ascending: false })
    .limit(10)

  const rows = (data ?? []) as MetricRow[]

  const totalViews = rows.reduce((a, v) => a + (v.views ?? 0), 0)
  const avgRetention =
    rows.length > 0
      ? Math.round(
          rows.reduce((a, v) => a + Number(v.retention ?? 0), 0) / rows.length,
        )
      : 0
  const avgCtr =
    rows.length > 0
      ? (
          rows.reduce((a, v) => a + Number(v.ctr ?? 0), 0) / rows.length
        ).toFixed(1)
      : '0'
  const avgWatch =
    rows.length > 0
      ? Math.round(
          rows.reduce((a, v) => a + (v.watch_time_sec ?? 0), 0) / rows.length,
        )
      : 0

  // Build a simple 7-day views trend from available data (fallback to zeros).
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  const viewsData = days.map((day, i) => ({
    day,
    views: rows[i]?.views ?? 0,
  }))

  const scoreData = rows
    .slice(0, 6)
    .map((v) => ({ title: v.title, score: v.viral_score ?? 0 }))

  return (
    <DashboardShell title="Analytics" profile={profile}>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">
          Performance de vos vidéos
        </h2>
        <p className="text-muted-foreground">
          Suivez vues, rétention, CTR et Viral Score pour optimiser votre
          contenu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Vues totales"
          value={totalViews.toLocaleString('fr-FR')}
          icon={Eye}
        />
        <StatCard
          label="Rétention moyenne"
          value={`${avgRetention}%`}
          icon={TrendingUp}
        />
        <StatCard
          label="CTR moyen"
          value={`${avgCtr}%`}
          icon={MousePointerClick}
        />
        <StatCard
          label="Watch time moyen"
          value={`${avgWatch}s`}
          icon={Timer}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ViewsChart data={viewsData} />
        <ScoreChart data={scoreData} />
      </div>
    </DashboardShell>
  )
}
