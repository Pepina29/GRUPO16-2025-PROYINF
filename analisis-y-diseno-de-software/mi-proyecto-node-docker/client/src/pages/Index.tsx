import { Header } from "@/components/Header";
import { LoanSimulator } from "@/components/LoanSimulator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="bg-gradient-hero rounded-2xl p-12 shadow-card-lg text-white mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bienvenido a nuestro Sistema de Préstamos
            </h2>
            <p className="text-lg md:text-xl mb-4 text-white/90">
              Simula tu préstamo, conoce las cuotas mensuales y solicita tu crédito de forma rápida y segura.
            </p>
            <p className="text-base text-white/80">
              Registrate para acceder a todas las funcionalidades.
            </p>
          </div>
        </section>

        {/* Loan Simulator */}
        <section className="mb-16 max-w-2xl mx-auto">
          <LoanSimulator />
        </section>

        {/* Features Section */}
        <section>
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            ¿Por qué elegirnos?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card hover:shadow-card-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Simula tu Préstamo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Calcula tus cuotas mensuales antes de solicitar tu préstamo. Sin sorpresas, todo transparente.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Proceso Rápido</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Solicita tu préstamo en minutos de forma 100% online. Sin papeleos ni esperas innecesarias.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-card-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-accent/10 p-3">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">Seguro y Confiable</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tus datos están protegidos con los mejores estándares de seguridad. Confianza garantizada.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Sistema de Préstamos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
