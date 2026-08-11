import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/site/logo'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-2xl border border-border bg-card p-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MailCheck className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold">
            Vérifiez vos emails
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nous vous avons envoyé un lien de confirmation. Cliquez dessus pour
            activer votre compte et accéder au dashboard.
          </p>
          <Button asChild variant="outline" className="mt-6 w-full">
            <Link href="/auth/login">Retour à la connexion</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
