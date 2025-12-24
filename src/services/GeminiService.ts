// Gemini AI Service - Automatic term categorization and enrichment
import { TermCategory } from "../types/models";
import type { PharmacyTerm } from "../types/models";

// Gemini API configuration
const GEMINI_API_KEY = "AIzaSyB1LTk_7cOZ7ZENGvbw6kXn1jSZUsOcY5A";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface TermAnalysis {
  category: TermCategory;
  definition: string;
  turkishName: string;
  etymology: string;
  usage: string;
  sideEffects: string[];
  relatedTerms: string[];
  components: string[];
  confidence: number;
}

class GeminiService {
  private apiKey: string;

  constructor(apiKey: string = GEMINI_API_KEY) {
    this.apiKey = apiKey;
  }

  // Set API key
  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return this.apiKey !== "YOUR_GEMINI_API_KEY" && this.apiKey.length > 0;
  }

  // Call Gemini API
  private async callGemini(prompt: string): Promise<string | null> {
    if (!this.isConfigured()) {
      console.warn("⚠️ Gemini API key not configured");
      return null;
    }

    try {
      console.log("🤖 Calling Gemini API...");
      const response = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Gemini API response:", errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      console.log("✅ Gemini API response received");
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error("❌ Gemini API error:", error);
      return null;
    }
  }

  // Analyze and categorize a term
  async analyzeTerm(termName: string): Promise<TermAnalysis | null> {
    const prompt = `Sen bir eczacılık ve tıp uzmanısın. Aşağıdaki terimi analiz et ve JSON formatında yanıt ver.

Terim: "${termName}"

Yanıtı SADECE aşağıdaki JSON formatında ver, başka hiçbir şey yazma:
{
  "category": "İlaçlar" | "Bitkiler" | "Böcekler" | "Bileşenler" | "Hastalıklar" | "Anatomi" | "Vitaminler",
  "definition": "Türkçe tanım (2-3 cümle)",
  "turkishName": "Türkçe karşılığı",
  "etymology": "Kelimenin kökeni",
  "usage": "Kullanım alanları",
  "sideEffects": ["yan etki 1", "yan etki 2"],
  "relatedTerms": ["ilişkili terim 1", "ilişkili terim 2"],
  "components": ["bileşen 1", "bileşen 2"],
  "confidence": 0.0-1.0 arası güven skoru
}

Kategoriler:
- İlaçlar: İlaçlar, farmasötik ürünler
- Bitkiler: Tıbbi bitkiler, şifalı otlar
- Böcekler: Tıbbi öneme sahip böcekler
- Bileşenler: Kimyasal bileşenler, etken maddeler
- Hastalıklar: Hastalıklar, sendromlar
- Anatomi: Vücut bölümleri, organlar
- Vitaminler: Vitaminler, mineraller, takviyeler`;

    const response = await this.callGemini(prompt);

    if (!response) {
      return null;
    }

    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("❌ Could not parse Gemini response as JSON");
        return null;
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Map category string to TermCategory enum
      const categoryMap: Record<string, TermCategory> = {
        İlaçlar: TermCategory.DRUG,
        Bitkiler: TermCategory.PLANT,
        Böcekler: TermCategory.INSECT,
        Bileşenler: TermCategory.COMPONENT,
        Hastalıklar: TermCategory.DISEASE,
        Anatomi: TermCategory.ANATOMY,
        Vitaminler: TermCategory.VITAMIN,
      };

      return {
        category: categoryMap[parsed.category] || TermCategory.DRUG,
        definition: parsed.definition || "",
        turkishName: parsed.turkishName || termName,
        etymology: parsed.etymology || "",
        usage: parsed.usage || "",
        sideEffects: parsed.sideEffects || [],
        relatedTerms: parsed.relatedTerms || [],
        components: parsed.components || [],
        confidence: parsed.confidence || 0.5,
      };
    } catch (error) {
      console.error("❌ Error parsing Gemini response:", error);
      return null;
    }
  }

  // Create a complete term from just a name
  async createTermFromName(
    latinName: string
  ): Promise<Partial<PharmacyTerm> | null> {
    console.log(`🤖 Gemini: Analyzing term "${latinName}"...`);

    const analysis = await this.analyzeTerm(latinName);

    if (!analysis) {
      console.warn(`⚠️ Gemini: Could not analyze term "${latinName}"`);
      return null;
    }

    console.log(
      `✅ Gemini: Term analyzed with ${(analysis.confidence * 100).toFixed(
        0
      )}% confidence`
    );

    return {
      latinName,
      turkishName: analysis.turkishName,
      category: analysis.category,
      definition: analysis.definition,
      etymology: analysis.etymology,
      usage: analysis.usage,
      sideEffects: analysis.sideEffects,
      relatedTerms: analysis.relatedTerms,
      components: analysis.components,
      synonyms: [],
      dosage: "",
      contraindications: [],
      interactions: [],
      isBookmarked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Batch analyze multiple terms
  async batchAnalyzeTerms(
    termNames: string[]
  ): Promise<Partial<PharmacyTerm>[]> {
    console.log(`🤖 Gemini: Batch analyzing ${termNames.length} terms...`);

    const results: Partial<PharmacyTerm>[] = [];

    for (const name of termNames) {
      const term = await this.createTermFromName(name);
      if (term) {
        results.push(term);
      }
      // Rate limiting - wait 1 second between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log(
      `✅ Gemini: Analyzed ${results.length}/${termNames.length} terms`
    );
    return results;
  }

  // Suggest related terms
  async suggestRelatedTerms(
    termName: string,
    category: TermCategory
  ): Promise<string[]> {
    const prompt = `"${termName}" (${category}) terimiyle ilişkili 5 eczacılık/tıp terimi öner.
Sadece terim isimlerini virgülle ayırarak yaz, başka bir şey yazma.`;

    const response = await this.callGemini(prompt);

    if (!response) {
      return [];
    }

    return response
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  // Translate term to Turkish
  async translateToTurkish(latinName: string): Promise<string | null> {
    const prompt = `"${latinName}" teriminin Türkçe karşılığını yaz. Sadece Türkçe karşılığı yaz, başka bir şey yazma.`;

    const response = await this.callGemini(prompt);
    return response?.trim() || null;
  }

  // Get term definition
  async getDefinition(termName: string): Promise<string | null> {
    const prompt = `"${termName}" teriminin eczacılık/tıp alanındaki tanımını 2-3 cümleyle Türkçe olarak yaz.`;

    const response = await this.callGemini(prompt);
    return response?.trim() || null;
  }
}

export const geminiService = new GeminiService();
export default geminiService;
