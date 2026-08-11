import type { ReactNode } from 'react'
import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { DashboardTopbar } from '@/components/dashboard/topbar'
import type { Profile } from '@/lib/get-profile'

export function DashboardShell({
  title,
  profile,
  children,
}: {
  title: string
  profile: Profile
  children: ReactNode
}) {
  return (
    <div className="flex min-h-dvh">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          title={title}
          email={profile.email}
          fullName={profile.full_name}
          plan={profile.plan}
          credits={profile.credits}
        />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
