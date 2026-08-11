import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

// La génération de vidéo Veo est longue : on autorise jusqu'à 5 minutes.
export const maxDuration = 300
export const dynamic = "force-dynamic"

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

// Modèles Veo essayés dans l'ordre (selon l'accès de la clé API).
const VEO_MODELS = [
  "veo-3.0-generate-preview",
  "veo-3.0-fast-generate-preview",
  "veo-2.0-generate-001",
]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: "La clé API Google est manquante sur Vercel (GOOGLE_API_KEY)." },
        { status: 500 },
      )
    }

    const body = await req.json().catch(() => ({}))
    const { prompt, category, style, duration } = body as {
      prompt?: string
      category?: string
      style?: string
      duration?: string | number
    }

    if (!prompt || !prompt.trim()) {
      return NextResponse.json({ error: "Le prompt est manquant." }, { status: 400 })
    }

    const ai = new GoogleGenAI({ apiKey })

    // Prompt enrichi avec la catégorie et le style choisis.
    const fullPrompt = [
      prompt.trim(),
      style ? `Style visuel : ${style}.` : "",
      category ? `Ambiance / thème : ${category}.` : "",
      "Format vertical 9:16, rendu cinématique haute qualité, immersif.",
    ]
      .filter(Boolean)
      .join(" ")

    let lastError: unknown = null

    for (const model of VEO_MODELS) {
      try {
        let operation = await ai.models.generateVideos({
          model,
          prompt: fullPrompt,
          config: {
            aspectRatio: "9:16",
            numberOfVideos: 1,
          },
        })

        // Polling : Veo est asynchrone (généralement 30 s à 2 min).
        const maxPolls = 28 // ~28 x 10s = 280s, sous la limite maxDuration
        let polls = 0
        while (!operation.done && polls < maxPolls) {
          await sleep(10000)
          operation = await ai.operations.getVideosOperation({ operation })
          polls++
        }

        if (!operation.done) {
          return NextResponse.json(
            { error: "La génération a pris trop de temps. Réessaie avec un prompt plus court." },
            { status: 504 },
          )
        }

        const generated = operation.response?.generatedVideos?.[0]
        const videoRef = generated?.video

        if (!videoRef?.uri) {
          throw new Error("Aucune vidéo n'a été retournée par le modèle.")
        }

        // Téléchargement des octets de la vidéo (l'URI nécessite la clé API).
        const downloadUrl = videoRef.uri.includes("key=")
          ? videoRef.uri
          : `${videoRef.uri}${videoRef.uri.includes("?") ? "&" : "?"}key=${apiKey}`

        const fileResp = await fetch(downloadUrl)
        if (!fileResp.ok) {
          throw new Error(`Téléchargement de la vidéo impossible (${fileResp.status}).`)
        }

        const arrayBuffer = await fileResp.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString("base64")
        const dataUrl = `data:video/mp4;base64,${base64}`

        return NextResponse.json({
          success: true,
          model,
          format: "9:16",
          requestedDuration: duration ?? null,
          videoUrl: dataUrl,
        })
      } catch (err) {
        lastError = err
        const message = err instanceof Error ? err.message : String(err)
        // Si le modèle n'est pas accessible, on tente le suivant.
        const shouldTryNext =
          /not found|not supported|permission|access|unavailable|404|403|400/i.test(message)
        if (!shouldTryNext) {
          throw err
        }
        console.log("[v0] Modèle Veo indisponible, tentative suivante:", model, message)
      }
    }

    const message = lastError instanceof Error ? lastError.message : "Génération impossible."
    return NextResponse.json(
      { error: `Aucun modèle Veo n'est accessible avec cette clé API. Détail : ${message}` },
      { status: 502 },
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : "La génération de la vidéo a échoué."
    console.log("[v0] Erreur de génération vidéo:", message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
