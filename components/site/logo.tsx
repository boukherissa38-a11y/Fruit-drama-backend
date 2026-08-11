import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-lg">
        🍓
      </span>
      <span className="font-heading text-base font-bold leading-none tracking-tight">
        Fruit Drama
        <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          AI Factory
        </span>
      </span>
    </Link>
  )
}
