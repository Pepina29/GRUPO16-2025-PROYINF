import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, UserPlus, LogOut } from "lucide-react";

interface User {
  rut: number;
  nombre: string;
  apellido: string;
  email: string;
}

export const Header = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h1 className="text-xl font-bold text-foreground">Sistema de Préstamos</h1>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm font-medium text-foreground">
                  {user.nombre} {user.apellido}
                </span>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setLoginOpen(true)}>
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
                <Button variant="default" size="sm" onClick={() => setRegisterOpen(true)}>
                  <UserPlus className="h-4 w-4" />
                  Registrarse
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
              ¿No tenés cuenta?{" "}
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
              ¿Ya tenés cuenta?{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={() => {
                  setRegisterOpen(false);
                  setLoginOpen(true);
                }}
              >
                Iniciá sesión acá
              </button>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
