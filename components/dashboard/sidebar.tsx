'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  LayoutDashboard,
  Library,
  Sparkles,
  Wand2,
} from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', label: 'Vue d’ensemble', icon: LayoutDashboard },
  { href: '/generate', label: 'Générer', icon: Wand2 },
  { href: '/library', label: 'Bibliothèque', icon: Library },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Logo />
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map((item) => {
          const active =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="m-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-accent" />
          Passez Pro
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Générations illimitées et vidéos sans watermark.
        </p>
        <Link
          href="/pricing"
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
        >
          Voir les offres
        </Link>
      </div>
    </aside>
  )
}
