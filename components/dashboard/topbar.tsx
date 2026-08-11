import Link from 'next/link'
import { LogOut, Wand2 } from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type TopbarProps = {
  title: string
  email: string
  fullName: string | null
  plan: string
  credits: number
}

export function DashboardTopbar({
  title,
  email,
  fullName,
  plan,
  credits,
}: TopbarProps) {
  const initials = (fullName || email || '?')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6">
      <h1 className="font-heading text-lg font-bold">{title}</h1>
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="hidden capitalize sm:inline-flex">
          Plan {plan}
        </Badge>
        {plan === 'free' && (
          <span className="hidden text-xs text-muted-foreground sm:inline">
            {credits} crédits restants
          </span>
        )}
        <Button asChild size="sm">
          <Link href="/generate">
            <Wand2 className="h-4 w-4" />
            Générer
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none ring-ring focus-visible:ring-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/15 text-xs text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {fullName || 'Créateur'}
                </span>
                <span className="text-xs font-normal text-muted-foreground">
                  {email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/pricing">Gérer l’abonnement</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action="/auth/signout" method="post" className="w-full">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
