import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import {
  Brain,
  LayoutDashboard,
  FileText,
  BookOpen,
  GraduationCap,
  User,
  CreditCard,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/generador", label: "Generador", icon: FileText },
  { to: "/app/resumen-pdf", label: "Resumen PDF", icon: BookOpen },
  { to: "/app/simulacros", label: "Simulacros ICFES", icon: GraduationCap },
];

const secondaryItems = [
  { to: "/app/perfil", label: "Mi perfil", icon: User },
  { to: "/app/suscripcion", label: "Suscripción", icon: CreditCard },
  { to: "/app/admin", label: "Panel Admin", icon: ShieldCheck },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (to: string, exact = false) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const active = isActive(item.to, (item as any).exact);
    return (
      <Link
        to={item.to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
          active
            ? "bg-sidebar-accent text-sidebar-primary font-medium"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        }`}
        style={{ fontSize: '0.875rem' }}
      >
        <item.icon className="w-4 h-4 flex-shrink-0" />
        {item.label}
      </Link>
    );
  };

  const Sidebar = () => (
    <aside className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-sidebar-border flex-shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground" style={{ fontSize: '1.0625rem' }}>
            Estudio<span className="text-sidebar-primary">IA</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="mb-4">
          <p className="px-3 mb-2 text-sidebar-foreground/40 uppercase tracking-widest" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
            Herramientas
          </p>
          {navItems.map((item) => (
            <NavLink key={item.to} item={item} />
          ))}
        </div>

        <div>
          <p className="px-3 mb-2 text-sidebar-foreground/40 uppercase tracking-widest" style={{ fontSize: '0.6875rem', fontWeight: 600 }}>
            Cuenta
          </p>
          {secondaryItems.map((item) => (
            <NavLink key={item.to} item={item as any} />
          ))}
        </div>
      </nav>

      {/* Upgrade banner */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="bg-primary/10 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-medium" style={{ fontSize: '0.8125rem' }}>Plan Gratuito</span>
          </div>
          <p className="text-muted-foreground mb-3" style={{ fontSize: '0.75rem', lineHeight: 1.5 }}>
            Actualiza a Pro para acceso ilimitado
          </p>
          <Link to="/app/suscripcion">
            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" style={{ fontSize: '0.8125rem' }}>
              Actualizar a Pro
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-64 h-full">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-card border-b border-border flex items-center px-4 sm:px-6 gap-4 flex-shrink-0">
          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 flex items-center gap-3 max-w-md">
            <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 flex-1">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground flex-1"
                placeholder="Buscar en EstudioIA…"
                style={{ fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 text-muted-foreground hover:text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-muted transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold" style={{ fontSize: '0.75rem' }}>
                    JP
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-foreground" style={{ fontSize: '0.8125rem', fontWeight: 500 }}>Juan Pablo</div>
                    <div className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Plan Gratuito</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/app/perfil")}>
                  <User className="w-4 h-4 mr-2" /> Mi perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/app/suscripcion")}>
                  <CreditCard className="w-4 h-4 mr-2" /> Suscripción
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
