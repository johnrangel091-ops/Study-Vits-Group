export interface AIResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AIProvider {
  name: string;
  generateText(prompt: string, systemPrompt?: string): Promise<AIResponse>;
}

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt }] }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Gemini API Error");
    
    return {
      text: data.candidates[0].content.parts[0].text
    };
  }
}

export class GroqProvider implements AIProvider {
  name = "Groq";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Groq API Error");

    return {
      text: data.choices[0].message.content,
      usage: {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens
      }
    };
  }
}

export class OpenRouterProvider implements AIProvider {
  name = "OpenRouter";
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<AIResponse> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "OpenRouter API Error");

    return {
      text: data.choices[0].message.content
    };
  }
}

export class AIService {
  private providers: AIProvider[] = [];
  private cache = new Map<string, AIResponse>();

  constructor() {
    const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const groqKey = import.meta.env.VITE_GROQ_API_KEY;
    const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (geminiKey) this.providers.push(new GeminiProvider(geminiKey));
    if (groqKey) this.providers.push(new GroqProvider(groqKey));
    if (openRouterKey) this.providers.push(new OpenRouterProvider(openRouterKey));
  }

  async generateText(prompt: string, systemPrompt?: string, useCache = true): Promise<AIResponse> {
    const cacheKey = `${systemPrompt}|${prompt}`;
    if (useCache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    let lastError: Error | null = null;

    for (const provider of this.providers) {
      try {
        const response = await provider.generateText(prompt, systemPrompt);
        if (useCache) this.cache.set(cacheKey, response);
        return response;
      } catch (error) {
        console.error(`Provider ${provider.name} failed:`, error);
        lastError = error as Error;
        continue; // Fallback to next provider
      }
    }

    throw lastError || new Error("No AI providers available or all failed");
  }
}

export const aiService = new AIService();
