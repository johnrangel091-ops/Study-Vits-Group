import { Link } from "react-router";
import { useState } from "react";
import {
  Brain,
  Zap,
  FileText,
  BookOpen,
  BarChart3,
  Star,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  GraduationCap,
  Users,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const features = [
  {
    icon: FileText,
    title: "Generador de Trabajos",
    desc: "Crea ensayos, informes y trabajos académicos con IA en segundos. Estructura perfecta, referencias incluidas.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: BookOpen,
    title: "Resumen de PDF",
    desc: "Sube cualquier documento y obtén un resumen inteligente, puntos clave y preguntas de estudio.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Brain,
    title: "Simulacros ICFES",
    desc: "Practica con miles de preguntas tipo ICFES. La IA adapta la dificultad a tu nivel.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: BarChart3,
    title: "Análisis de Progreso",
    desc: "Visualiza tu rendimiento, identifica áreas débiles y recibe recomendaciones personalizadas.",
    color: "bg-amber-50 text-amber-600",
  },
];

const stats = [
  { value: "120K+", label: "Estudiantes activos" },
  { value: "4.8M+", label: "Documentos procesados" },
  { value: "96%", label: "Tasa de aprobación" },
  { value: "2.4x", label: "Velocidad de estudio" },
];

const testimonials = [
  {
    name: "Valentina Ríos",
    role: "Estudiante Universidad Nacional",
    text: "EstudioIA me ayudó a pasar mis parciales de Cálculo. El resumen de PDF es increíble, me ahorra horas de lectura.",
    rating: 5,
    avatar: "VR",
  },
  {
    name: "Sebastián Mora",
    role: "Estudiante Grado 11, Bogotá",
    text: "Gracias al simulador ICFES subí 47 puntos en mi puntaje. Las explicaciones de la IA son muy claras.",
    rating: 5,
    avatar: "SM",
  },
  {
    name: "Camila Herrera",
    role: "Estudiante Ingeniería de Sistemas",
    text: "El generador de trabajos es una herramienta que todo universitario necesita. Me ha salvado en muchas entregas.",
    rating: 5,
    avatar: "CH",
  },
];

const plans = [
  {
    name: "Gratis",
    price: "0",
    desc: "Para explorar la plataforma",
    features: ["5 resúmenes de PDF/mes", "10 preguntas ICFES/día", "1 trabajo generado/mes", "Soporte básico"],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "29.900",
    desc: "Para estudiantes serios",
    features: ["Resúmenes ilimitados", "Simulacros ICFES ilimitados", "20 trabajos/mes", "Análisis de progreso", "Soporte prioritario"],
    cta: "Comenzar Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "59.900",
    desc: "Para máximo rendimiento",
    features: ["Todo en Pro", "Trabajos ilimitados", "IA tutor personalizado", "Plan de estudio adaptativo", "Soporte 24/7"],
    cta: "Comenzar Premium",
    popular: false,
  },
];

import { aiService } from "./ai-provider";
import { SYSTEM_PROMPTS } from "./prompts";

export function WorkGenerator() {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("ensayo");
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await aiService.generateText(
        `Genera un ${type} sobre el siguiente tema: ${topic}`,
        SYSTEM_PROMPTS.WORK_GENERATOR
      );
      setResult(response.text);
    } catch (error) {
      console.error(error);
      alert("Error al generar el trabajo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Generador de Trabajos Académicos</h1>
        <p className="text-muted-foreground">Crea contenido estructurado con IA real.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tema del trabajo</label>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ej: La importancia de la biodiversidad en Colombia"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de documento</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="ensayo">Ensayo</option>
            <option value="informe">Informe</option>
            <option value="exposicion">Exposición</option>
            <option value="resumen">Resumen</option>
          </select>
        </div>
        <Button onClick={handleGenerate} disabled={!topic || loading} className="w-full">
          {loading ? "Generando..." : "Generar Trabajo Real"}
        </Button>
      </div>

      {result && (
        <div className="bg-card border rounded-xl p-6 prose dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}

export function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem' }}>
              Estudio<span className="text-primary">IA</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {["Funciones", "Precios", "Testimonios", "Blog"].map((item) => (
              <button key={item} className="text-muted-foreground hover:text-foreground transition-colors" style={{ fontSize: '0.875rem' }}>
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Iniciar sesión</Button>
            </Link>
            <Link to="/registro">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Comenzar gratis
              </Button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card px-4 py-4 flex flex-col gap-3">
            {["Funciones", "Precios", "Testimonios"].map((item) => (
              <button key={item} className="text-left text-muted-foreground py-2">{item}</button>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Iniciar sesión</Button>
              </Link>
              <Link to="/registro" className="flex-1">
                <Button size="sm" className="w-full bg-primary text-primary-foreground">Registrarse</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="mb-6 bg-secondary text-secondary-foreground border-0 px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Impulsado por GPT-4 y Claude 3
          </Badge>

          <h1 className="mb-6 leading-tight" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Estudia más inteligente,
            <br />
            <span className="text-primary">no más duro</span>
          </h1>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto" style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
            La plataforma de IA diseñada para estudiantes colombianos. Genera trabajos, resume PDFs y prepárate para el ICFES con inteligencia artificial.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link to="/registro">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
                Comenzar gratis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="outline" className="gap-2">
                Ver demo en vivo
              </Button>
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-border">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bold text-foreground" style={{ fontSize: '1.75rem', fontWeight: 800 }}>{s.value}</div>
                <div className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image / mockup */}
        <div className="mt-16 relative">
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="bg-muted/40 px-4 py-3 flex items-center gap-2 border-b border-border">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-background rounded-md px-4 py-1 text-muted-foreground border border-border" style={{ fontSize: '0.75rem' }}>
                  app.estudioIA.co/dashboard
                </div>
              </div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="h-6 w-40 bg-muted rounded-md" />
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Resúmenes completados", val: "24", color: "bg-indigo-50", icon: "📄" },
                    { label: "Simulacros ICFES", val: "312 pts", color: "bg-emerald-50", icon: "🎯" },
                    { label: "Trabajos generados", val: "8", color: "bg-violet-50", icon: "✍️" },
                    { label: "Horas ahorradas", val: "47h", color: "bg-amber-50", icon: "⚡" },
                  ].map((c) => (
                    <div key={c.label} className={`${c.color} rounded-xl p-4`}>
                      <div style={{ fontSize: '1.5rem' }}>{c.icon}</div>
                      <div className="font-bold text-foreground mt-1" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{c.val}</div>
                      <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{c.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-muted/30 rounded-xl p-4">
                  <div className="h-3 w-24 bg-muted rounded mb-3" />
                  <div className="flex gap-1 items-end h-16">
                    {[40, 65, 55, 80, 70, 90, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }}>
                        <div className="w-full bg-primary rounded-t-sm" style={{ height: '30%' }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 600 }}>IA Tutor</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-muted rounded-lg p-2 text-muted-foreground" style={{ fontSize: '0.75rem' }}>¿Cuál es la segunda ley de Newton?</div>
                    <div className="bg-primary text-primary-foreground rounded-lg p-2" style={{ fontSize: '0.75rem' }}>F = ma: La fuerza es igual a la masa multiplicada por la aceleración…</div>
                  </div>
                </div>
                <div className="bg-accent/5 border border-accent/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Progreso ICFES</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div className="bg-accent rounded-full h-2" style={{ width: '72%' }} />
                    </div>
                    <span className="text-accent font-bold" style={{ fontSize: '0.875rem' }}>72%</span>
                  </div>
                  <p className="text-muted-foreground mt-1" style={{ fontSize: '0.7rem' }}>Matemáticas · Nivel Avanzado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Funcionalidades</Badge>
            <h2 className="mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Todo lo que necesitas para estudiar mejor
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto" style={{ fontSize: '1rem' }}>
              Herramientas de IA diseñadas específicamente para el sistema educativo colombiano.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="mb-2 text-foreground" style={{ fontSize: '1rem', fontWeight: 600 }}>{f.title}</h3>
                <p className="text-muted-foreground" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">¿Cómo funciona?</Badge>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Simple como 1, 2, 3
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Crea tu cuenta", desc: "Regístrate gratis en menos de 30 segundos. No necesitas tarjeta de crédito.", icon: Users },
            { num: "02", title: "Elige tu herramienta", desc: "Resumen de PDF, generador de trabajos o simulacro ICFES. Tú eliges.", icon: Zap },
            { num: "03", title: "Estudia más rápido", desc: "La IA procesa tu contenido y genera resultados de alta calidad al instante.", icon: GraduationCap },
          ].map((step) => (
            <div key={step.num} className="relative text-center">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-primary font-bold mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>{step.num}</div>
              <h3 className="mb-2" style={{ fontWeight: 600 }}>{step.title}</h3>
              <p className="text-muted-foreground" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Testimonios</Badge>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
              Lo que dicen nuestros estudiantes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-foreground mb-5" style={{ fontSize: '0.9375rem', lineHeight: '1.6' }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold" style={{ fontSize: '0.75rem' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground" style={{ fontSize: '0.875rem' }}>{t.name}</div>
                    <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Badge className="mb-4 bg-secondary text-secondary-foreground border-0">Planes</Badge>
          <h2 className="mb-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Precios simples y transparentes
          </h2>
          <p className="text-muted-foreground" style={{ fontSize: '1rem' }}>Paga mensualmente, cancela cuando quieras.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 border ${plan.popular ? 'border-primary bg-primary text-primary-foreground shadow-xl scale-105' : 'border-border bg-card'} transition-all`}>
              {plan.popular && (
                <Badge className="mb-3 bg-white/20 text-white border-0">Más popular</Badge>
              )}
              <div className="mb-4">
                <div className={`${plan.popular ? 'text-white/80' : 'text-muted-foreground'} mb-1`} style={{ fontSize: '0.875rem' }}>{plan.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold" style={{ fontSize: '2rem', fontWeight: 800 }}>
                    ${plan.price}
                  </span>
                  {plan.price !== "0" && <span className={plan.popular ? 'text-white/70' : 'text-muted-foreground'} style={{ fontSize: '0.875rem' }}>/mes</span>}
                </div>
                <p className={`${plan.popular ? 'text-white/70' : 'text-muted-foreground'} mt-1`} style={{ fontSize: '0.8125rem' }}>{plan.desc}</p>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white/80' : 'text-accent'}`} />
                    <span className={`${plan.popular ? 'text-white/90' : 'text-foreground'}`} style={{ fontSize: '0.875rem' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/registro">
                <Button
                  className={`w-full ${plan.popular ? 'bg-white text-primary hover:bg-white/90' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
                  size="sm"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <GraduationCap className="w-12 h-12 text-primary-foreground/60 mx-auto mb-5" />
          <h2 className="text-primary-foreground mb-4" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700 }}>
            Únete a 120,000 estudiantes que ya estudian con IA
          </h2>
          <p className="text-primary-foreground/70 mb-8" style={{ fontSize: '1rem' }}>
            Comienza gratis hoy. Sin tarjeta de crédito.
          </p>
          <Link to="/registro">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-10">
              Crear cuenta gratis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold" style={{ fontSize: '1rem' }}>Estudio<span className="text-primary">IA</span></span>
            </div>
            <div className="flex gap-6 text-muted-foreground" style={{ fontSize: '0.875rem' }}>
              {["Privacidad", "Términos", "Contacto", "Blog"].map((l) => (
                <button key={l} className="hover:text-foreground transition-colors">{l}</button>
              ))}
            </div>
            <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
              © 2026 EstudioIA · Hecho con ❤️ en Colombia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
