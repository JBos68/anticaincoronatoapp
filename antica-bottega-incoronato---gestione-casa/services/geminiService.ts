
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

// Always use the named parameter for apiKey and directly use process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIInventoryAdvice = async (products: Product[], query: string) => {
  try {
    const productsContext = products.map(p => 
      `${p.name} (Cat: ${p.category}, Stock: ${p.stock}, Prezzo: €${p.price})`
    ).join(', ');

    const systemPrompt = `Sei un esperto consulente gestionale per un negozio di articoli per la casa chiamato 'Antica Bottega Incoronato'. 
    Analizza l'inventario attuale e rispondi alle domande dell'utente in modo professionale, cordiale e utile.
    Inventario Attuale: [${productsContext}]`;

    // Use ai.models.generateContent directly with the specified model and system instruction in config.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    // Access the .text property directly (not a method) from GenerateContentResponse.
    return response.text || "Mi dispiace, non sono riuscito a elaborare una risposta.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Errore nella comunicazione con l'assistente IA.";
  }
};
