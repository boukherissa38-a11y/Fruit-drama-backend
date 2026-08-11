export const CHARACTERS = [
  { id: 'fraise', name: 'Fraise', emoji: '🍓', trait: 'manipulatrice' },
  { id: 'banane', name: 'Banane', emoji: '🍌', trait: 'naïve' },
  { id: 'ananas', name: 'Ananas', emoji: '🍍', trait: 'arrogant' },
  { id: 'pasteque', name: 'Pastèque', emoji: '🍉', trait: 'protectrice' },
] as const

export const NICHES = [
  'Trahison amoureuse',
  'Rivalité au travail',
  'Secret de famille',
  'Vengeance',
  'Amitié brisée',
  'Mensonge démasqué',
] as const

export type Plan = 'free' | 'pro' | 'business'

export const PLANS: {
  id: Plan
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: string
}[] = [
  {
    id: 'free',
    name: 'Normal',
    price: '2,86€',
    period: '/mois',
    description: 'Pour tester la magie du drama.',
    features: [
      '5 générations de scripts / mois',
      'Vidéos avec watermark',
      'Qualité standard 720p',
      '4 personnages fruits',
      'Export TikTok 9:16',
    ],
    cta: 'Commencer gratuitement',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '14,99€',
    period: '/mois',
    description: 'Pour les créateurs qui veulent percer.',
    features: [
      'Générations illimitées',
      'Sans watermark',
      'Qualité HD 1080p',
      'Viral Score AI avancé',
      'Voix storytelling premium',
      'Analytics complètes',
    ],
    highlighted: true,
    cta: 'Passer Pro',
  },
  {
    id: 'business',
    name: 'Business',
    price: '20€',
    period: '/mois',
    description: 'Pour les agences et les studios.',
    features: [
      'Tout le plan Pro',
      'Accès API complet',
      'Bot d’automatisation 24/7',
      'Upload TikTok automatisé',
      'Membres d’équipe illimités',
      'Support prioritaire',
    ],
    cta: 'Contacter les ventes',
  },
]
