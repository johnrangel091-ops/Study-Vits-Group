import { Link } from "react-router";
import {
  FileText, BookOpen, GraduationCap, TrendingUp, Zap,
  Clock, Target, ArrowRight, Flame, Star, BarChart2,
  ChevronRight, Brain,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const activityData = [
  { day: "Lun", score: 42 }, { day: "Mar", score: 58 }, { day: "Mié", score: 51 },
  { day: "Jue", score: 74 }, { day: "Vie", score: 67 }, { day: "Sáb", score: 83 }, { day: "Dom", score: 79 },
];

const recentActivity = [
  { icon: BookOpen, title: "Resumen: Cálculo Diferencial", subtitle: "Capítulos 3–5 · 24 páginas", time: "hace 2h", color: "bg-indigo-100 text-indigo-600" },
  { icon: GraduationCap, title: "Simulacro ICFES #14", subtitle: "Matemáticas · 312 / 500 pts", time: "hace 5h", color: "bg-emerald-100 text-emerald-600" },
  { icon: FileText, title: "Ensayo: Revolución Francesa", subtitle: "Historia · 1.200 palabras", time: "ayer", color: "bg-violet-100 text-violet-600" },
  { icon: BookOpen, title: "Resumen: Termodinámica", subtitle: "Física Universitaria · 18 páginas", time: "ayer", color: "bg-amber-100 text-amber-600" },
];

const subjectProgress = [
  { subject: "Matemáticas", score: 78, color: "bg-primary" },
  { subject: "Ciencias Naturales", score: 65, color: "bg-accent" },
  { subject: "Lectura Crítica", score: 82, color: "bg-violet-500" },
  { subject: "Sociales", score: 59, color: "bg-amber-500" },
];

const tools = [
  { to: "/app/generador", icon: FileText, label: "Generador de Trabajos", desc: "Ensayos, informes y más", color: "bg-indigo-50", iconColor: "text-indigo-600" },
  { to: "/app/resumen-pdf", icon: BookOpen, label: "Resumen de PDF", desc: "Sube y resume al instante", color: "bg-emerald-50", iconColor: "text-emerald-600" },
  { to: "/app/simulacros", icon: GraduationCap, label: "Simulacros ICFES", desc: "Practica con IA adaptativa", color: "bg-violet-50", iconColor: "text-violet-600" },
];

export function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-foreground" style={{ fontSize: '1.625rem', fontWeight: 700 }}>
            ¡Hola, Juan Pablo! 👋
          </h1>
          <p className="text-muted-foreground mt-0.5" style={{ fontSize: '0.9375rem' }}>
            Llevas <span className="text-primary font-semibold">12 días seguidos</span> estudiando. ¡Sigue así!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <Flame className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-amber-700" style={{ fontSize: '0.9375rem' }}>12 días</span>
          <span className="text-amber-600" style={{ fontSize: '0.8125rem' }}>racha activa</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Documentos resumidos", value: "24", icon: BookOpen, delta: "+3 esta semana", color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Puntaje ICFES", value: "312", icon: Target, delta: "+18 vs. semana pasada", color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Trabajos generados", value: "8", icon: FileText, delta: "+2 esta semana", color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Horas ahorradas", value: "47h", icon: Clock, delta: "+6h esta semana", color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-bold text-foreground mb-0.5" style={{ fontSize: '1.625rem', fontWeight: 800, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{stat.label}</div>
            <div className="text-accent mt-1.5" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              <TrendingUp className="w-3 h-3 inline mr-1" />
              {stat.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Activity chart */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-foreground" style={{ fontWeight: 600 }}>Actividad semanal</h3>
              <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>Puntos de práctica por día</p>
            </div>
            <Badge className="bg-secondary text-secondary-foreground border-0">Esta semana</Badge>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, fontSize: 13 }}
                  formatter={(v: number) => [`${v} pts`, 'Puntuación']}
                />
                <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={2} fill="url(#grad)" dot={{ fill: '#4F46E5', r: 4 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject progress */}
        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-foreground mb-1" style={{ fontWeight: 600 }}>Progreso por materia</h3>
          <p className="text-muted-foreground mb-5" style={{ fontSize: '0.8125rem' }}>Preparación ICFES</p>
          <div className="space-y-4">
            {subjectProgress.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-foreground" style={{ fontSize: '0.875rem' }}>{s.subject}</span>
                  <span className="font-semibold text-foreground" style={{ fontSize: '0.875rem' }}>{s.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link to="/app/simulacros">
            <Button size="sm" variant="outline" className="w-full mt-5 gap-2">
              Ver detalle completo <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick access tools */}
      <div className="mb-8">
        <h3 className="text-foreground mb-4" style={{ fontWeight: 600 }}>Acceso rápido</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tools.map((t) => (
            <Link key={t.to} to={t.to}>
              <div className="bg-card rounded-2xl border border-border p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                <div className={`w-11 h-11 rounded-xl ${t.color} flex items-center justify-center mb-4`}>
                  <t.icon className={`w-5 h-5 ${t.iconColor}`} />
                </div>
                <h4 className="text-foreground mb-1" style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{t.label}</h4>
                <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{t.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Abrir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-foreground" style={{ fontWeight: 600 }}>Actividad reciente</h3>
          <button className="text-primary hover:underline" style={{ fontSize: '0.8125rem' }}>Ver todo</button>
        </div>
        <div className="space-y-1">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
              <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-foreground truncate" style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</div>
                <div className="text-muted-foreground truncate" style={{ fontSize: '0.8125rem' }}>{item.subtitle}</div>
              </div>
              <div className="text-muted-foreground flex-shrink-0" style={{ fontSize: '0.75rem' }}>{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
