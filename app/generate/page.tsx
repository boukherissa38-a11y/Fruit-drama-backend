"use client"

import { useEffect, useRef, useState } from "react"

const categories = [
  "🍓 Fruit Drama",
  "😂 Comédie",
  "📖 Histoire",
  "❤️ Romance",
  "👻 Horreur",
  "🔥 Motivation",
  "🤖 IA",
  "✨ Libre",
]

const styles = ["Cinématique", "Réaliste", "Anime", "Pixar", "TikTok", "3D"]

type VideoItem = {
  id: number
  title: string
  prompt: string
  category: string
  style: string
  duration: string
  createdAt: string
}

export default function GeneratePage() {
  const [title, setTitle] = useState("")
  const [prompt, setPrompt] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [style, setStyle] = useState(styles[0])
  const [duration, setDuration] = useState("30")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")
  const [error, setError] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [videos, setVideos] = useState<VideoItem[]>([])

  const statusTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("videos")
      if (saved) setVideos(JSON.parse(saved))
    } catch {
      // localStorage indisponible, on ignore
    }
    return () => {
      if (statusTimer.current) clearInterval(statusTimer.current)
    }
  }, [])

  async function handleGenerate() {
    setError("")
    if (!prompt.trim()) {
      setError("Écris un prompt décrivant ta vidéo.")
      return
    }

    setLoading(true)
    setVideoUrl("")

    // Messages de progression (Veo est asynchrone, pas de vrai pourcentage).
    const steps = [
      "Analyse du prompt...",
      "Initialisation du modèle Veo...",
      "Génération des images clés...",
      "Rendu de la vidéo (cela peut prendre 1 à 2 minutes)...",
      "Assemblage final...",
    ]
    let stepIndex = 0
    setStatus(steps[0])
    statusTimer.current = setInterval(() => {
      stepIndex = Math.min(stepIndex + 1, steps.length - 1)
      setStatus(steps[stepIndex])
    }, 12000)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, category, style, duration }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "La génération a échoué.")
      }

      setVideoUrl(data.videoUrl)

      // On sauvegarde uniquement les métadonnées (pas la vidéo, pour éviter
      // de dépasser le quota du localStorage).
      const item: VideoItem = {
        id: Date.now(),
        title: title || "Sans titre",
        prompt,
        category,
        style,
        duration,
        createdAt: new Date().toISOString(),
      }
      const list = [item, ...videos].slice(0, 30)
      setVideos(list)
      try {
        localStorage.setItem("videos", JSON.stringify(list))
      } catch {
        // quota dépassé, on ignore
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.")
    } finally {
      if (statusTimer.current) clearInterval(statusTimer.current)
      setStatus("")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">🎬 Générer une vidéo</h1>
        <p className="text-gray-400 mb-8">
          Décris la vidéo que tu souhaites créer. La génération utilise Google Veo.
        </p>

        <div className="bg-slate-800 rounded-2xl p-6 md:p-8 space-y-5">
          <input
            className="w-full p-4 rounded-xl bg-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Titre de la vidéo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="w-full p-4 rounded-xl bg-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              className="w-full p-4 rounded-xl bg-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {styles.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <select
              className="w-full p-4 rounded-xl bg-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="15">15 secondes</option>
              <option value="30">30 secondes</option>
              <option value="60">60 secondes</option>
            </select>
          </div>

          <textarea
            rows={8}
            className="w-full p-4 rounded-xl bg-slate-900 outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Décris précisément la vidéo..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-500 disabled:opacity-60 disabled:cursor-not-allowed rounded-xl p-4 text-xl font-bold transition-colors"
          >
            {loading ? "⏳ Génération..." : "🚀 Générer"}
          </button>

          {loading && (
            <div className="flex items-center gap-3 text-gray-300">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
              <p>{status}</p>
            </div>
          )}

          {error && (
            <p className="rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 p-4">
              {error}
            </p>
          )}
        </div>

        {videoUrl && (
          <div className="mt-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-5">Aperçu</h2>
            <div className="mx-auto max-w-sm">
              <video
                src={videoUrl}
                controls
                autoPlay
                loop
                playsInline
                className="w-full rounded-2xl bg-black aspect-[9/16] object-cover"
              />
              <a
                href={videoUrl}
                download={`${title || "video"}.mp4`}
                className="mt-4 block text-center bg-slate-700 hover:bg-slate-600 rounded-xl p-3 font-semibold transition-colors"
              >
                ⬇️ Télécharger la vidéo
              </a>
            </div>
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Historique récent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((v) => (
                <div key={v.id} className="bg-slate-800 rounded-xl p-4">
                  <p className="font-semibold">{v.title}</p>
                  <p className="text-sm text-gray-400 line-clamp-2">{v.prompt}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {v.category} · {v.style} · {v.duration}s
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
