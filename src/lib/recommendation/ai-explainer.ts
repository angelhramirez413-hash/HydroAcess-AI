import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AssessmentInput, Locale, Recommendation } from "./types";

export interface ExplanationRequest {
  input: AssessmentInput;
  recommendation: Recommendation;
  locale: Locale;
}

export interface RecommendationExplainer {
  explain(request: ExplanationRequest): Promise<string>;
}

export class GeminiRecommendationExplainer implements RecommendationExplainer {
  private readonly client: GoogleGenerativeAI | null;

  constructor(apiKey = process.env.GEMINI_API_KEY) {
    this.client = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  }

  async explain({ input, recommendation, locale }: ExplanationRequest) {
    if (!this.client) {
      return locale === "es"
        ? "Gemini no esta configurado. La recomendacion se genero con la base de conocimiento estructurada de HydroAccess AI."
        : "Gemini is not configured. This recommendation was generated from HydroAccess AI structured engineering knowledge.";
    }

    const model = this.client.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = [
      "You are HydroAccess AI. Explain only the provided structured recommendation.",
      "Do not add engineering methods, dosage values, or materials that are not in the supplied JSON.",
      `Respond in ${locale === "es" ? "Spanish" : "English"}.`,
      JSON.stringify({ input, recommendation }, null, 2)
    ].join("\n\n");

    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}
