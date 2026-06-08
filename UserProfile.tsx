import { useState } from "react";
import { GraduationCap, ChevronRight, CheckCircle2, XCircle, Clock, BarChart2, Trophy, RotateCcw, Play, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

const subjects = [
  { id: "mat", label: "Matemáticas", icon: "📐", color: "bg-indigo-100 text-indigo-600", questions: 12 },
  { id: "lec", label: "Lectura crítica", icon: "📖", color: "bg-emerald-100 text-emerald-600", questions: 10 },
  { id: "cna", label: "Ciencias Naturales", icon: "🔬", color: "bg-violet-100 text-violet-600", questions: 10 },
  { id: "soc", label: "Sociales y Ciudadanas", icon: "🌍", color: "bg-amber-100 text-amber-600", questions: 10 },
  { id: "ing", label: "Inglés", icon: "🇬🇧", color: "bg-red-100 text-red-600", questions: 8 },
];

const questions = [
  {
    id: 1, subject: "Matemáticas",
    text: "Si f(x) = 3x² - 2x + 1, ¿cuál es el valor de f(3)?",
    options: ["22", "24", "26", "28"],
    correct: 2,
    explanation: "f(3) = 3(3)² - 2(3) + 1 = 3(9) - 6 + 1 = 27 - 6 + 1 = 22. Recuerda aplicar primero la potencia, luego la multiplicación.",
  },
  {
    id: 2, subject: "Lectura Crítica",
    text: "En el texto: \"El progreso tecnológico ha transformado radicalmente la comunicación humana, sin embargo, paradójicamente ha generado un mayor aislamiento social entre los individuos.\" La palabra 'paradójicamente' indica que:",
    options: [
      "El autor está de acuerdo con el progreso tecnológico",
      "El resultado descrito es contradictorio con lo esperado",
      "La comunicación ha mejorado gracias a la tecnología",
      "El aislamiento social es un mito contemporáneo",
    ],
    correct: 1,
    explanation: "Paradójicamente significa que algo va en contra de lo que se esperaría lógicamente. El progreso debería unir a las personas, pero en cambio las aísla.",
  },
  {
    id: 3, subject: "Ciencias Naturales",
    text: "¿Cuál de los siguientes procesos ocurre en las mitocondrias de las células?",
    options: ["Fotosíntesis", "Respiración celular", "Síntesis de proteínas", "Duplicación del ADN"],
    correct: 1,
    explanation: "La respiración celular ocurre en las mitocondrias, donde se produce ATP mediante la oxidación de glucosa. Las mitocondrias son conocidas como la 'central energética' de la célula.",
  },
];

const radarData = [
  { subject: "Matemáticas", A: 78 },
  { subject: "Lectura", A: 85 },
  { subject: "C. Naturales", A: 65 },
  { subject: "Sociales", A: 72 },
  { subject: "Inglés", A: 60 },
];

type Phase = "home" | "quiz" | "results";

export function ICFESSimulator() {
  const [phase, setPhase] = useState<Phase>("home");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft] = useState(45 * 60);
  const [chosenSubject, setChosenSubject] = useState<string | null>(null);

  const q = questions[current];
  const correct = answers.filter((a, i) => a === questions[i]?.correct).length;
  const pct = Math.round((correct / questions.length) * 100);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const next = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    setShowExplanation(false);
    if (current + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrent(current + 1);
    }
  };

  const reset = () => {
    setPhase("home");
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
  };

  if (phase === "home") {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-violet-600" />
            </div>
            <h1 className="text-foreground" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Simulacros ICFES</h1>
          </div>
          <p className="text-muted-foreground ml-12" style={{ fontSize: '0.9375rem' }}>
            Practica con preguntas reales y recibe retroalimentación inteligente
          </p>
        </div>

        {/* Score overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
            <h3 className="text-foreground mb-5" style={{ fontWeight: 600 }}>Tu puntaje por área</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(0,0,0,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Radar name="Puntaje" dataKey="A" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.15} strokeWidth={2} />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'Puntaje']} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Puntaje ICFES", value: "312", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
              { label: "Preguntas correctas", value: "87%", icon: CheckCircle2, color: "text-accent", bg: "bg-emerald-50" },
              { label: "Simulacros hechos", value: "14", icon: Target, color: "text-primary", bg: "bg-indigo-50" },
            ].map((s) => (
              <div key={s.label} className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <div>
                  <div className="font-bold text-foreground" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                  <div className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject cards */}
        <h3 className="text-foreground mb-4" style={{ fontWeight: 600 }}>Elegir materia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => { setChosenSubject(s.id); setPhase("quiz"); }}
              className={`bg-card rounded-2xl border p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-4 ${
                chosenSubject === s.id ? "border-primary" : "border-border"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl ${s.color.split(" ")[0]} flex items-center justify-center text-2xl flex-shrink-0`}>
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground font-medium truncate" style={{ fontSize: '0.9375rem' }}>{s.label}</div>
                <div className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{s.questions} preguntas</div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}

          <button
            onClick={() => setPhase("quiz")}
            className="bg-primary rounded-2xl p-5 text-left hover:bg-primary/90 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-white font-medium" style={{ fontSize: '0.9375rem' }}>Simulacro Completo</div>
              <div className="text-white/70" style={{ fontSize: '0.8125rem' }}>50 preguntas · 90 min</div>
            </div>
            <Play className="w-5 h-5 text-white/80 flex-shrink-0" />
          </button>
        </div>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={reset} className="text-muted-foreground hover:text-foreground transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
                Pregunta {current + 1} de {questions.length}
              </span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((current + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-card rounded-2xl border border-border p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-violet-100 text-violet-700 border-0">{q.subject}</Badge>
          </div>
          <p className="text-foreground mb-6" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
            {q.text}
          </p>
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = i === q.correct;
              const showResult = showExplanation;
              let cls = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary";
              if (showResult && isCorrect) cls = "border-accent bg-emerald-50 text-emerald-800";
              else if (showResult && isSelected && !isCorrect) cls = "border-destructive bg-red-50 text-red-800";
              else if (!showResult && isSelected) cls = "border-primary bg-secondary text-primary";
              return (
                <button
                  key={i}
                  disabled={showExplanation}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${cls}`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold ${
                    isSelected && !showResult ? "border-primary bg-primary text-primary-foreground" :
                    showResult && isCorrect ? "border-accent bg-accent text-accent-foreground" :
                    showResult && isSelected ? "border-destructive bg-destructive text-destructive-foreground" :
                    "border-current"
                  }`} style={{ fontSize: '0.75rem' }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span style={{ fontSize: '0.9375rem' }}>{opt}</span>
                  {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-accent ml-auto flex-shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive ml-auto flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="bg-secondary border border-primary/20 rounded-2xl p-5 mb-5">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-primary" />
              <span className="text-primary font-semibold" style={{ fontSize: '0.9rem' }}>Explicación IA</span>
            </div>
            <p className="text-foreground" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>{q.explanation}</p>
          </div>
        )}

        <div className="flex gap-3">
          {!showExplanation && selected !== null && (
            <Button variant="outline" className="gap-2" onClick={() => setShowExplanation(true)}>
              <GraduationCap className="w-4 h-4" /> Ver explicación
            </Button>
          )}
          <Button
            disabled={selected === null}
            onClick={next}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            {current + 1 >= questions.length ? "Ver resultados" : "Siguiente"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Results
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="bg-card rounded-2xl border border-border p-8 text-center mb-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-9 h-9 text-primary" />
        </div>
        <h2 className="text-foreground mb-1" style={{ fontSize: '1.625rem', fontWeight: 700 }}>¡Simulacro completado!</h2>
        <p className="text-muted-foreground mb-6" style={{ fontSize: '0.9375rem' }}>
          Respondiste {questions.length} preguntas correctamente {correct} de ellas
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="font-bold text-foreground" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>{pct}%</span>
        </div>
        <Progress value={pct} className="h-3 max-w-xs mx-auto mb-2" />
        <p className="text-muted-foreground" style={{ fontSize: '0.875rem' }}>
          {pct >= 80 ? "🎉 Excelente resultado" : pct >= 60 ? "👍 Buen trabajo, sigue practicando" : "💪 Sigue practicando, puedes mejorar"}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {questions.map((q, i) => {
          const a = answers[i];
          const ok = a === q.correct;
          return (
            <div key={q.id} className={`flex items-start gap-3 p-4 rounded-xl border ${ok ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${ok ? "bg-accent" : "bg-destructive"}`}>
                {ok ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : <XCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <div>
                <p className={`${ok ? "text-emerald-800" : "text-red-800"}`} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                  Pregunta {i + 1} · {q.subject}
                </p>
                <p className={`mt-0.5 ${ok ? "text-emerald-700" : "text-red-700"}`} style={{ fontSize: '0.8125rem' }}>
                  {ok ? "Correcta ✓" : `Incorrecta — Respuesta: ${q.options[q.correct]}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={reset} className="flex-1 gap-2">
          <RotateCcw className="w-4 h-4" /> Nuevo simulacro
        </Button>
        <Button className="flex-1 bg-primary text-primary-foreground gap-2">
          <BarChart2 className="w-4 h-4" /> Ver análisis detallado
        </Button>
      </div>
    </div>
  );
}
