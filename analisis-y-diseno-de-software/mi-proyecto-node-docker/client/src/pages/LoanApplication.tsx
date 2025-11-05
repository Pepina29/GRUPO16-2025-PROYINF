import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { FileText, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoanApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Obtener datos del préstamo simulado (si vienen de la simulación)
  const loanData = location.state || {};

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    ingresos: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí puedes hacer la llamada al backend
    try {
      // Simulación de envío
      console.log("Datos del formulario:", formData);
      console.log("Datos del préstamo:", loanData);

      // Ejemplo de llamada al backend (descomenta cuando lo implementes):
      // const response = await fetch('http://localhost:3000/api/solicitudes', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, ...loanData })
      // });

      toast({
        title: "¡Solicitud enviada!",
        description: "Nos pondremos en contacto contigo pronto.",
      });

      // Redirigir después de enviar
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <Card className="shadow-card-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-accent" />
              Solicitud de Préstamo
            </CardTitle>
            <CardDescription>
              Completa tus datos para procesar tu solicitud
            </CardDescription>
            
            {/* Mostrar resumen del préstamo si existe */}
            {loanData.monto && (
              <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm font-semibold mb-2">Resumen de tu préstamo:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Monto:</span>
                  <span className="font-medium">${loanData.monto?.toLocaleString('es-CL')}</span>
                  <span className="text-muted-foreground">Cuotas:</span>
                  <span className="font-medium">{loanData.cuotas}</span>
                  <span className="text-muted-foreground">Pago mensual:</span>
                  <span className="font-medium">${loanData.pagoPorCuota?.toLocaleString('es-CL')}</span>
                </div>
              </div>
            )}
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    name="apellido"
                    type="text"
                    placeholder="Pérez"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rut">RUT *</Label>
                <Input
                  id="rut"
                  name="rut"
                  type="text"
                  placeholder="12.345.678-9"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono *</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input
                  id="direccion"
                  name="direccion"
                  type="text"
                  placeholder="Av. Principal 123"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  placeholder="Santiago"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingresos">Ingresos mensuales *</Label>
                <Input
                  id="ingresos"
                  name="ingresos"
                  type="number"
                  placeholder="500000"
                  value={formData.ingresos}
                  onChange={handleChange}
                  required
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Indica tus ingresos mensuales aproximados
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="accent"
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Enviar Solicitud
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoanApplication;