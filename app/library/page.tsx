import { DashboardShell } from '@/components/dashboard/shell'
import { VideoList, type VideoRow } from '@/components/dashboard/video-list'
import { getSessionProfile } from '@/lib/get-profile'

export default async function LibraryPage() {
  const { supabase, profile } = await getSessionProfile()

  const { data: videos } = await supabase
    .from('videos')
    .select('id, title, niche, status, viral_score, views, created_at')
    .order('created_at', { ascending: false })

  const rows = (videos ?? []) as VideoRow[]

  return (
    <DashboardShell title="Bibliothèque" profile={profile}>
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold">Vos vidéos</h2>
        <p className="text-muted-foreground">
          Tous vos scripts et vidéos générés, du plus récent au plus ancien.
        </p>
      </div>
      <VideoList videos={rows} />
    </DashboardShell>
  )
}
