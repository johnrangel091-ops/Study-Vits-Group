import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { Brain, Eye, EyeOff, ArrowRight, Chrome } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/app");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[480px] bg-primary flex-col justify-between p-12 flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold" style={{ fontSize: '1.1rem' }}>EstudioIA</span>
        </Link>

        <div>
          <blockquote className="text-white/90 mb-6" style={{ fontSize: '1.375rem', fontWeight: 600, lineHeight: 1.4 }}>
            "EstudioIA me ayudó a subir 60 puntos en el ICFES. Definitivamente la mejor herramienta de estudio."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold" style={{ fontSize: '0.875rem' }}>
              JP
            </div>
            <div>
              <div className="text-white font-medium" style={{ fontSize: '0.875rem' }}>Juan Pablo Gómez</div>
              <div className="text-white/60" style={{ fontSize: '0.8125rem' }}>Estudiante Grado 11 · Medellín</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { val: "120K+", label: "Estudiantes" },
            { val: "4.8M+", label: "Docs procesados" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-4">
              <div className="text-white font-bold" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{s.val}</div>
              <div className="text-white/60" style={{ fontSize: '0.8125rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold" style={{ fontSize: '1.1rem' }}>Estudio<span className="text-primary">IA</span></span>
          </div>

          <h1 className="mb-1 text-foreground" style={{ fontSize: '1.75rem', fontWeight: 700 }}>Bienvenido de vuelta</h1>
          <p className="text-muted-foreground mb-8" style={{ fontSize: '0.9375rem' }}>
            Ingresa a tu cuenta para continuar estudiando
          </p>

          {/* OAuth */}
          <Button variant="outline" className="w-full mb-4 gap-2" onClick={() => navigate("/app")}>
            <Chrome className="w-4 h-4" />
            Continuar con Google
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground" style={{ fontSize: '0.8125rem' }}>o con tu correo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@universidad.edu.co"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <button type="button" className="text-primary hover:underline" style={{ fontSize: '0.8125rem' }}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 mt-2" disabled={loading}>
              {loading ? "Iniciando sesión…" : "Iniciar sesión"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6" style={{ fontSize: '0.875rem' }}>
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-primary hover:underline font-medium">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
