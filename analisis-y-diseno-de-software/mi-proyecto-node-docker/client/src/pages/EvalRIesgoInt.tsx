import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const EvalRiesgoInt = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">
              Formulario Manual de Evaluación
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Completa la información solicitada para realizar tu evaluación de riesgo
          </p>
        </section>

        <Card className="shadow-card-lg">
          <CardHeader>
            <CardTitle>Próximamente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Esta página estará disponible próximamente. Aquí podrás completar un formulario 
              detallado sin necesidad de usar tu RUT.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Sistema de Préstamos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default EvalRiesgoInt;