import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Phone, Mail, MapPin, Clock, HelpCircle } from "lucide-react";

const Information = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Info className="h-12 w-12 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Información</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas saber sobre nuestros servicios de préstamos
          </p>
        </section>

        {/* Información general */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-accent/10 p-2">
                    <span className="text-accent font-bold">1</span>
                  </div>
                  Simula tu préstamo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Usa nuestra calculadora para conocer cuánto pagarías mensualmente según el monto y plazo que elijas.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-accent/10 p-2">
                    <span className="text-accent font-bold">2</span>
                  </div>
                  Solicita en línea
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Completa el formulario con tus datos personales. El proceso es 100% digital y solo toma minutos.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-accent/10 p-2">
                    <span className="text-accent font-bold">3</span>
                  </div>
                  Evaluación rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro equipo evaluará tu solicitud en menos de 24 horas hábiles.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="rounded-full bg-accent/10 p-2">
                    <span className="text-accent font-bold">4</span>
                  </div>
                  Recibe tu dinero
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Una vez aprobado, el dinero se deposita directamente en tu cuenta bancaria.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Requisitos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Requisitos para solicitar
          </h2>
          <Card className="shadow-card-lg">
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-success/10 p-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">Ser mayor de 18 años</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-success/10 p-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">Tener RUT válido</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-success/10 p-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">Contar con ingresos demostrables</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-success/10 p-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">Tener cuenta bancaria activa</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-success/10 p-1">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-muted-foreground">No tener deudas morosas</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Tasas y plazos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Tasas y Plazos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card border-accent/20">
              <CardHeader>
                <CardTitle>Corto Plazo</CardTitle>
                <CardDescription>2 - 12 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">18%</p>
                  <p className="text-sm text-muted-foreground mt-2">Tasa anual</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-accent/20">
              <CardHeader>
                <CardTitle>Mediano Plazo</CardTitle>
                <CardDescription>13 - 36 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">22%</p>
                  <p className="text-sm text-muted-foreground mt-2">Tasa anual</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-accent/20">
              <CardHeader>
                <CardTitle>Largo Plazo</CardTitle>
                <CardDescription>37 - 72 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent">25%</p>
                  <p className="text-sm text-muted-foreground mt-2">Tasa anual</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            Preguntas Frecuentes
          </h2>
          <div className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">¿Cuánto tiempo tarda la aprobación?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El proceso de evaluación toma entre 12 a 24 horas hábiles. Te notificaremos por email o SMS.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo pagar antes de tiempo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, puedes realizar pagos anticipados sin penalización. Esto reduce el monto total de intereses.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">¿Qué pasa si no puedo pagar una cuota?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Contáctanos inmediatamente. Podemos evaluar opciones de refinanciamiento o reprogramación.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contacto */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Contáctanos
          </h2>
          <Card className="shadow-card-lg bg-gradient-hero text-white">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Teléfono</p>
                    <p className="text-white/90">+56 9 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-white/90">contacto@prestamos.cl</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Dirección</p>
                    <p className="text-white/90">Av. Principal 123, Santiago</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Horario</p>
                    <p className="text-white/90">Lun - Vie: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default Information;