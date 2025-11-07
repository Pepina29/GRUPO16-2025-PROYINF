import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, LogOut, Info, Home } from "lucide-react";
import { SIMS_KEY } from "@/components/simStorage";

interface User {
  rut: number;
  nombre: string;
  apellido: string;
  email: string;
}

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // --- badge simulaciones guardadas ---
  const [savedCount, setSavedCount] = useState(0);

  const readSavedCount = () => {
    try {
      const raw = localStorage.getItem(SIMS_KEY);
      if (!raw) return 0;
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr.length : 0;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const update = () => setSavedCount(readSavedCount());
    const onStorage = (_e: StorageEvent) => update();
    const onCustom = (_e: Event) => update();

    update(); // carga inicial
    window.addEventListener("storage", onStorage);
    window.addEventListener("simulations:changed", onCustom);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("simulations:changed", onCustom);
    };
  }, []);
  // ------------------------------------

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Simulación de login
    setUser({
      rut: parseInt(formData.get("rut") as string),
      nombre: "Usuario",
      apellido: "Demo",
      email: "demo@ejemplo.com",
    });
    setLoginOpen(false);
    e.currentTarget.reset();
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Simulación de registro
    setUser({
      rut: parseInt(formData.get("rut") as string),
      nombre: formData.get("nombre") as string,
      apellido: formData.get("apellido") as string,
      email: formData.get("email") as string,
    });
    setRegisterOpen(false);
    e.currentTarget.reset();
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">💰</span>
              <h1 className="text-xl font-bold text-foreground">Sistema de Préstamos</h1>
            </button>

            {/* Navegación */}
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={location.pathname === "/" ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate("/")}
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
              <Button
                variant={location.pathname === "/informacion" ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate("/informacion")}
              >
                <Info className="h-4 w-4 mr-2" />
                Información
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-foreground hidden sm:inline">
                  {user.nombre} {user.apellido}
                </span>

                {/* PERFIL con badge de simulaciones */}
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/perfil" className="relative">
                    Perfil
                    {savedCount > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs h-5 min-w-5 px-1">
                        {savedCount}
                      </span>
                    )}
                  </Link>
                </Button>

                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Cerrar Sesión</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Iniciar Sesión</span>
                </Button>
                <Button variant="default" size="sm" onClick={() => setRegisterOpen(true)}>
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline ml-2">Registrarse</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Iniciar Sesión</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-rut">RUT</Label>
              <Input id="login-rut" name="rut" type="number" placeholder="12345678" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input id="login-password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                Registrate acá
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Modal */}
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registrarse</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-rut">RUT</Label>
              <Input id="reg-rut" name="rut" type="number" placeholder="12345678" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-nombre">Nombre</Label>
              <Input id="reg-nombre" name="nombre" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-apellido">Apellido</Label>
              <Input id="reg-apellido" name="apellido" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Contraseña</Label>
              <Input id="reg-password" name="password" type="password" minLength={6} required />
            </div>
            <Button type="submit" className="w-full">
              Registrarse
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => {
                  setRegisterOpen(false);
                  setLoginOpen(true);
                }}
              >
                Inicia sesión acá
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
