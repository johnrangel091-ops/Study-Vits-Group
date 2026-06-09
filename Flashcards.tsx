import { useState } from "react";
import { Button } from "./ui/button";
import { aiService } from "./ai-provider";
import { SYSTEM_PROMPTS } from "./prompts";

export function Flashcards() {
  const [topic, setTopic] = useState("");
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await aiService.generateText(
        `Genera 5 flashcards sobre: ${topic}`,
        SYSTEM_PROMPTS.FLASHCARDS
      );
      const data = JSON.parse(response.text);
      setFlashcards(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      alert("Error al generar flashcards");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Generador de Flashcards</h1>
        <p className="text-muted-foreground">Convierte cualquier tema en tarjetas de estudio.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 space-y-4">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Tema para las flashcards..."
          className="w-full p-2 border rounded-md bg-background"
        />
        <Button onClick={handleGenerate} disabled={!topic || loading} className="w-full">
          {loading ? "Generando..." : "Generar Flashcards con IA"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {flashcards.map((card, i) => (
          <div key={i} className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="text-xs font-bold text-primary mb-2 uppercase">{card.categoria || card.category}</div>
            <div className="font-bold mb-4">P: {card.pregunta || card.question}</div>
            <div className="text-muted-foreground border-t pt-4">R: {card.respuesta || card.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
