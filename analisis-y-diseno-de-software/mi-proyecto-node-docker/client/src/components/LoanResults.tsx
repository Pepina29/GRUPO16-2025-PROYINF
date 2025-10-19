import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

interface LoanResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monto: number;
  tasaInteres: number;
  cuotas: number;
  fechaPrimerPago: string;
  pagoPorCuota: number;
  montoTotal: number;
}

export const LoanResults = ({
  open,
  onOpenChange,
  monto,
  tasaInteres,
  cuotas,
  fechaPrimerPago,
  pagoPorCuota,
  montoTotal,
}: LoanResultsProps) => {
  const handleSolicitar = () => {
    alert("¡Solicitud de préstamo enviada! En breve te contactaremos.");
    onOpenChange(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-UY", {
      style: "currency",
      currency: "UYU",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const d = /^\d{4}-\d{2}-\d{2}$/.test(dateString)
      ? parse(dateString, "yyyy-MM-dd", new Date())
      : new Date(dateString);
    return format(d, "dd 'de' MMMM 'de' yyyy", { locale: es });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="h-6 w-6 text-success" />
            Resultado de tu Simulación
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monto Solicitado</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(monto)}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tasa de Interés Anual</span>
                <span className="font-semibold text-foreground">{tasaInteres}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cantidad de Cuotas</span>
                <span className="font-semibold text-foreground">{cuotas} cuotas</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Fecha Primer Pago</span>
                </div>
                <span className="font-semibold text-foreground">{formatDate(fechaPrimerPago)}</span>
              </div>
            </div>

            <Separator />

            <div className="rounded-lg bg-accent/10 p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">Pago por Cuota</span>
                </div>
                <span className="text-xl font-bold text-accent">{formatCurrency(pagoPorCuota)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center rounded-lg border border-border p-4">
              <span className="font-medium text-foreground">Monto Total del Préstamo</span>
              <span className="text-xl font-bold text-foreground">{formatCurrency(montoTotal)}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Modificar
          </Button>
          <Button variant="accent" onClick={handleSolicitar} className="flex-1" size="lg">
            Realizar Solicitud de Préstamo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
