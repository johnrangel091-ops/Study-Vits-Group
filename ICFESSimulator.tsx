import { useState } from "react";
import { Button } from "./ui/button";
import { aiService } from "./ai-provider";
import { SYSTEM_PROMPTS } from "./prompts";

export function ICFESSimulator() {
  const [results, setResults] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!results) return;
    setLoading(true);
    try {
      const response = await aiService.generateText(
        `Analiza estos resultados de simulacro ICFES:\n\n${results}`,
        SYSTEM_PROMPTS.ICFES_ANALYZER
      );
      setAnalysis(response.text);
    } catch (error) {
      console.error(error);
      alert("Error al analizar resultados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Simulador y Analizador ICFES</h1>
        <p className="text-muted-foreground">La IA analizará tus fortalezas y debilidades reales.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Puntajes por materia (Ej: Matemáticas: 70, Lectura: 65...)</label>
          <textarea 
            value={results}
            onChange={(e) => setResults(e.target.value)}
            placeholder="Ingresa tus puntajes o resultados de simulacros anteriores..."
            className="w-full p-3 border rounded-md bg-background min-h-[150px]"
          />
        </div>
        <Button onClick={handleAnalyze} disabled={!results || loading} className="w-full">
          {loading ? "Analizando..." : "Analizar con IA"}
        </Button>
      </div>

      {analysis && (
        <div className="bg-card border rounded-xl p-6 whitespace-pre-wrap">
          <h2 className="text-xl font-bold mb-4">Análisis Personalizado</h2>
          {analysis}
        </div>
      )}
    </div>
  );
}
