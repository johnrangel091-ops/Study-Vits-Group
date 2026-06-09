import { useState } from "react";
import {
  ShieldCheck, Users, TrendingUp, DollarSign, BarChart2,
  Search, MoreVertical, UserX, UserCheck, Mail, Filter,
  ArrowUpRight, ArrowDownRight, Activity, AlertTriangle, Eye,
  FileText, BookOpen, GraduationCap,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const revenueData = [
  { month: "Ene", revenue: 2800000 }, { month: "Feb", revenue: 3200000 },
  { month: "Mar", revenue: 3800000 }, { month: "Abr", revenue: 4100000 },
  { month: "May", revenue: 4600000 }, { month: "Jun", revenue: 5200000 },
];

const usageData = [
  { day: "Lun", pdfs: 1240, works: 380, icfes: 2100 },
  { day: "Mar", pdfs: 1480, works: 420, icfes: 2350 },
  { day: "Mié", pdfs: 1100, works: 310, icfes: 1980 },
  { day: "Jue", pdfs: 1820, works: 510, icfes: 2780 },
  { day: "Vie", pdfs: 1650, works: 470, icfes: 2560 },
  { day: "Sáb", pdfs: 980, works: 280, icfes: 1720 },
  { day: "Dom", pdfs: 860, works: 240, icfes: 1540 },
];

const users = [
  { id: 1, name: "Valentina Ríos", email: "vrios@unal.edu.co", plan: "Pro", status: "active", joined: "12 Feb 2026", usage: "98%" },
  { id: 2, name: "Sebastián Mora", email: "smora@gmail.com", plan: "Gratis", status: "active", joined: "01 Mar 2026", usage: "45%" },
  { id: 3, name: "Camila Herrera", email: "camila@correo.com", plan: "Premium", status: "active", joined: "18 Ene 2026", usage: "100%" },
  { id: 4, name: "Andrés Betancur", email: "abetancur@edu.co", plan: "Pro", status: "suspended", joined: "05 Feb 2026", usage: "12%" },
  { id: 5, name: "Laura Martínez", email: "lmartinez@uni.co", plan: "Gratis", status: "active", joined: "22 Mar 2026", usage: "67%" },
  { id: 6, name: "Diego Salcedo", email: "dsalcedo@itm.edu.co", plan: "Premium", status: "active", joined: "10 Abr 2026", usage: "89%" },
  { id: 7, name: "Sara Ospina", email: "sospina@gmail.com", plan: "Gratis", status: "inactive", joined: "14 Mar 2026", usage: "3%" },
];

const alerts = [
  { type: "error", text: "Servicio de IA con latencia elevada (>4s)", time: "hace 12 min" },
  { type: "warning", text: "Límite de almacenamiento al 87%", time: "hace 2h" },
  { type: "info", text: "Actualización de seguridad disponible v2.4.1", time: "hace 5h" },
  { type: "success", text: "Backup diario completado exitosamente", time: "hace 8h" },
];

const planBadge: Record<string, string> = {
  Gratis: "bg-muted text-muted-foreground",
  Pro: "bg-secondary text-secondary-foreground",
  Premium: "bg-amber-100 text-amber-700",
};

const statusBadge: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  suspended: "bg-red-100 text-red-700",
  inactive: "bg-muted text-muted-foreground",
};

import { aiService } from "./ai-provider";
import { pdfService } from "./pdf-service";
import { SYSTEM_PROMPTS } from "./prompts";

export function PDFSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const content = await pdfService.extractText(file);
      const response = await aiService.generateText(
        `Analiza este contenido de PDF:\n\n${content.text.substring(0, 10000)}`,
        SYSTEM_PROMPTS.SUMMARIZER
      );
      setResult(JSON.parse(response.text));
    } catch (error) {
      console.error(error);
      alert("Error al procesar el PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Resumidor de PDF con IA</h1>
        <p className="text-muted-foreground">Sube tu archivo y obtén un análisis detallado.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 mb-8">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
        <Button onClick={handleProcess} disabled={!file || loading} className="w-full">
          {loading ? "Procesando..." : "Generar Resumen Real"}
        </Button>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Resumen</h2>
            <p className="mb-4">{result.resumen_corto || result.short_summary}</p>
            <h3 className="font-bold mb-2">Puntos Clave</h3>
            <ul className="list-disc pl-5">
              {(result.puntos_importantes || result.key_points || []).map((p: string, i: number) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminPanel() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n: number) =>
    n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-foreground" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Panel Administrativo</h1>
            <p className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>EstudioIA · Admin · Junio 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Exportar reporte
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Enviar comunicado
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Usuarios activos", value: "121.480", delta: "+12.4%", up: true, icon: Users, bg: "bg-indigo-50", color: "text-indigo-600" },
          { label: "Ingresos MRC", value: "$5.2M", delta: "+8.7%", up: true, icon: DollarSign, bg: "bg-emerald-50", color: "text-emerald-600" },
          { label: "Docs procesados hoy", value: "14.820", delta: "+23%", up: true, icon: BookOpen, bg: "bg-violet-50", color: "text-violet-600" },
          { label: "Tasa de conversión", value: "6.2%", delta: "-0.3%", up: false, icon: TrendingUp, bg: "bg-amber-50", color: "text-amber-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="font-bold text-foreground mb-0.5" style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div className="text-muted-foreground mb-1.5" style={{ fontSize: '0.8125rem' }}>{stat.label}</div>
            <div className={`flex items-center gap-1 ${stat.up ? "text-accent" : "text-destructive"}`} style={{ fontSize: '0.75rem', fontWeight: 500 }}>
              {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              {stat.delta} vs. mes anterior
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-5">
          <h3 className="text-foreground mb-5" style={{ fontWeight: 600 }}>Ingresos mensuales</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, fontSize: 12 }}
                  formatter={(v: number) => [fmt(v), 'Ingresos']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#revGrad)" dot={{ fill: '#10B981', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-5">
          <h3 className="text-foreground mb-2" style={{ fontWeight: 600 }}>Distribución de planes</h3>
          <p className="text-muted-foreground mb-5" style={{ fontSize: '0.8125rem' }}>121.480 usuarios totales</p>
          <div className="space-y-3.5">
            {[
              { label: "Plan Gratis", pct: 74, color: "bg-muted", count: "89.895" },
              { label: "Plan Pro", pct: 19, color: "bg-primary", count: "23.081" },
              { label: "Plan Premium", pct: 7, color: "bg-amber-500", count: "8.504" },
            ].map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-foreground" style={{ fontSize: '0.875rem' }}>{p.label}</span>
                  <span className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{p.count} ({p.pct}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-foreground mb-3" style={{ fontSize: '0.875rem', fontWeight: 600 }}>Sistema</h4>
            <div className="space-y-2">
              {[
                { label: "API IA", status: "online", latency: "142ms" },
                { label: "Base de datos", status: "online", latency: "8ms" },
                { label: "Almacenamiento", status: "warning", latency: "87% uso" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${s.status === "online" ? "bg-accent" : s.status === "warning" ? "bg-amber-400" : "bg-destructive"}`} />
                    <span className="text-foreground" style={{ fontSize: '0.8125rem' }}>{s.label}</span>
                  </div>
                  <span className="text-muted-foreground" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{s.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Usage chart */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-8">
        <h3 className="text-foreground mb-5" style={{ fontWeight: 600 }}>Uso de herramientas (últimos 7 días)</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="pdfs" name="Resúmenes PDF" fill="#4F46E5" radius={[4, 4, 0, 0]} />
              <Bar dataKey="works" name="Trabajos" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="icfes" name="Simulacros" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-3 justify-center">
          {[
            { color: "bg-primary", label: "Resúmenes PDF" },
            { color: "bg-accent", label: "Trabajos" },
            { color: "bg-violet-500", label: "Simulacros" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${l.color}`} />
              <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="bg-muted/50 p-1 rounded-xl mb-5 grid grid-cols-2 max-w-sm">
          <TabsTrigger value="users" className="rounded-lg">Usuarios</TabsTrigger>
          <TabsTrigger value="alerts" className="rounded-lg">Alertas</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <h3 className="text-foreground" style={{ fontWeight: 600 }}>Gestión de usuarios</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 flex-1 sm:flex-none sm:w-56">
                  <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <input
                    className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-full"
                    placeholder="Buscar usuario…"
                    style={{ fontSize: '0.875rem' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 flex-shrink-0">
                  <Filter className="w-3.5 h-3.5" /> Filtrar
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["Usuario", "Plan", "Estado", "Registrado", "Uso", ""].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-muted-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0" style={{ fontSize: '0.75rem' }}>
                            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="text-foreground" style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</div>
                            <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge className={`${planBadge[user.plan]} border-0`} style={{ fontSize: '0.75rem' }}>
                          {user.plan}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge className={`${statusBadge[user.status]} border-0`} style={{ fontSize: '0.75rem' }}>
                          {user.status === "active" ? "Activo" : user.status === "suspended" ? "Suspendido" : "Inactivo"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-muted-foreground" style={{ fontSize: '0.8125rem' }}>{user.joined}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${parseInt(user.usage) > 80 ? "bg-destructive" : "bg-accent"}`}
                              style={{ width: user.usage }}
                            />
                          </div>
                          <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>{user.usage}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem><Mail className="w-4 h-4 mr-2" />Enviar email</DropdownMenuItem>
                            <DropdownMenuItem><UserCheck className="w-4 h-4 mr-2" />Cambiar plan</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><UserX className="w-4 h-4 mr-2" />Suspender</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-3 border-t border-border flex items-center justify-between text-muted-foreground" style={{ fontSize: '0.8125rem' }}>
              <span>Mostrando {filtered.length} de {users.length} usuarios</span>
              <div className="flex gap-1">
                {["← Anterior", "1", "2", "3", "Siguiente →"].map((p) => (
                  <button key={p} className={`px-2.5 py-1 rounded-lg transition-colors ${p === "1" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="text-foreground mb-5" style={{ fontWeight: 600 }}>Alertas del sistema</h3>
            <div className="space-y-3">
              {alerts.map((a, i) => {
                const colors: Record<string, string> = {
                  error: "bg-red-50 border-red-200 text-red-700",
                  warning: "bg-amber-50 border-amber-200 text-amber-700",
                  info: "bg-secondary border-primary/20 text-primary",
                  success: "bg-emerald-50 border-emerald-200 text-emerald-700",
                };
                return (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${colors[a.type]}`}>
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{a.text}</p>
                      <p className="opacity-70 mt-0.5" style={{ fontSize: '0.8125rem' }}>{a.time}</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-inherit border-current/30 flex-shrink-0">
                      Resolver
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
