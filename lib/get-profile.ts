import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type Profile = {
  id: string
  email: string
  full_name: string | null
  plan: string
  credits: number
}

export async function getSessionProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name, plan, credits')
    .eq('id', user.id)
    .single()

  const resolved: Profile = profile ?? {
    id: user.id,
    email: user.email ?? '',
    full_name: (user.user_metadata?.full_name as string) ?? null,
    plan: 'free',
    credits: 5,
  }

  return { supabase, user, profile: resolved }
}
