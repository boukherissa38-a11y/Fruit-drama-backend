const STEPS = [
  {
    n: '01',
    title: 'Choisissez le drama',
    desc: 'Sélectionnez une niche et vos personnages fruits préférés.',
  },
  {
    n: '02',
    title: 'L’IA écrit le script',
    desc: 'Hook, conflit, twist et conclusion générés en quelques secondes.',
  },
  {
    n: '03',
    title: 'Voix & vidéo',
    desc: 'La voix émotionnelle et la vidéo verticale 9:16 sont assemblées.',
  },
  {
    n: '04',
    title: 'Publiez & analysez',
    desc: 'Exportez vers TikTok et suivez le Viral Score de chaque vidéo.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            De l’idée à la viralité en 4 étapes
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative">
              <span className="font-heading text-4xl font-bold text-primary/30">
                {s.n}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
