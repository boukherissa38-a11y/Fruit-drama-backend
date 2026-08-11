import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Récupération de la clé API (compatible GEMINI_API_KEY ou GOOGLE_API_KEY)
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export async function POST(req: Request) {
  try {
      if (!apiKey) {
            return NextResponse.json(
                    { error: "La clé API Gemini est manquante sur Vercel." },
                            { status: 500 }
                                  );
                                      }

                                          // Initialisation
                                              const genAI = new GoogleGenerativeAI(apiKey);
                                                  // On utilise un modèle Gemini officiel valide pour le texte/scripts
                                                      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

                                                          // 1. SIMULATION DU PAIEMENT (À remplacer selon ton besoin)
                                                              const userHasPaid = true; // Mis sur 'true' pour tester la génération sans blocage

                                                                  if (!userHasPaid) {
                                                                        return NextResponse.json(
                                                                                { redirect: "/pricing", error: "Abonnement requis" },
                                                                                        { status: 402 }
                                                                                              );
                                                                                                  }

                                                                                                      // 2. RÉCUPÉRATION DES PARAMÈTRES ENVOYÉS PAR LE FRONTEND
                                                                                                          const { topic, duration } = await req.json();

                                                                                                              if (!topic) {
                                                                                                                    return NextResponse.json(
                                                                                                                            { error: "Le sujet (topic) est manquant" },
                                                                                                                                    { status: 400 }
                                                                                                                                          );
                                                                                                                                              }

                                                                                                                                                  const videoDuration = duration === 70 ? 70 : 30;

                                                                                                                                                      // 3. CONSTRUCTIONS DU PROMPT
                                                                                                                                                          const prompt = `Génère un script vidéo ultra-réaliste pour TikTok (format 9:16 vertical) basé sur le sujet suivant : "${topic}".
                                                                                                                                                          CONTRAINTES STRICTES :
                                                                                                                                                          - Format : Vertical 9:16
                                                                                                                                                          - Durée estimée : ${videoDuration} secondes
                                                                                                                                                          - Style : Pas d'animation artificielle, rendu immersif et captivant.`;

                                                                                                                                                              // 4. GÉNÉRATION VIA GEMINI
                                                                                                                                                                  const result = await model.generateContent(prompt);
                                                                                                                                                                      const responseText = result.response.text();

                                                                                                                                                                          return NextResponse.json({
                                                                                                                                                                                success: true,
                                                                                                                                                                                      duration: videoDuration,
                                                                                                                                                                                            format: "9:16",
                                                                                                                                                                                                  script: responseText,
                                                                                                                                                                                                      });
                                                                                                                                                                                                        } catch (error: any) {
                                                                                                                                                                                                            console.error("Erreur de génération :", error);
                                                                                                                                                                                                                return NextResponse.json(
                                                                                                                                                                                                                      { error: error.message || "La génération de la vidéo a échoué." },
                                                                                                                                                                                                                            { status: 500 }
                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                  
                                                                                                                                                                                          