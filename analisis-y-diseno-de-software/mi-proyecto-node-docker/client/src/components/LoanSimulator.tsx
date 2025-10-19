import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { LoanResults } from "./LoanResults";
import { format } from "date-fns";

export const LoanSimulator = () => {
  const [monto, setMonto] = useState("");
  const [cuotas, setCuotas] = useState("");
  const [fechaPrimerPago, setFechaPrimerPago] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [loanData, setLoanData] = useState({
    monto: 0,
    tasaInteres: 0,
    cuotas: 0,
    fechaPrimerPago: "",
    pagoPorCuota: 0,
    montoTotal: 0,
  });

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();

    const montoNum = parseFloat(monto);
    const cuotasNum = parseInt(cuotas);

    // Tasa de interés anual simulada (varía según plazo)
    let tasaAnual = 0;
    if (cuotasNum <= 12) {
      tasaAnual = 18; // 18% anual para préstamos cortos
    } else if (cuotasNum <= 36) {
      tasaAnual = 22; // 22% anual para préstamos medios
    } else {
      tasaAnual = 25; // 25% anual para préstamos largos
    }

    const tasaMensual = tasaAnual / 12 / 100;

    // Fórmula de cuota fija (sistema francés)
    const pagoPorCuota =
      (montoNum * tasaMensual * Math.pow(1 + tasaMensual, cuotasNum)) /
      (Math.pow(1 + tasaMensual, cuotasNum) - 1);

    const montoTotal = pagoPorCuota * cuotasNum;

    setLoanData({
      monto: montoNum,
      tasaInteres: tasaAnual,
      cuotas: cuotasNum,
      fechaPrimerPago,
      pagoPorCuota: Math.round(pagoPorCuota),
      montoTotal: Math.round(montoTotal),
    });

    setShowResults(true);
  };

  return (
    <>
      <Card className="shadow-card-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-accent" />
            Simula tu Préstamo
          </CardTitle>
          <CardDescription>Calcula las cuotas mensuales antes de solicitar tu crédito</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={calculateLoan} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monto">Monto a simular</Label>
              <Input
                id="monto"
                type="number"
                placeholder="Ej: 100000"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
                min="10000"
                max="10000000"
                step="1000"
              />
              <p className="text-xs text-muted-foreground">Monto entre $10.000 y $10.000.000</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuotas">Cantidad de cuotas</Label>
              <Select value={cuotas} onValueChange={setCuotas} required>
                <SelectTrigger id="cuotas">
                  <SelectValue placeholder="Seleccioná la cantidad de cuotas" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {Array.from({ length: 71 }, (_, i) => i + 2).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} cuotas
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">De 2 a 72 cuotas</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha primer pago</Label>
              <Input
                id="fecha"
                type="date"
                value={fechaPrimerPago}
                onChange={(e) => {
                  const val = e.target.value;
                  const localDate = new Date(val + "T12:00:00");
                  const fixed = localDate.toISOString().slice(0,10);
                  setFechaPrimerPago(fixed);
                }}
                required
                min={format(new Date(), "yyyy-MM-dd")}
              />
            </div>

            <Button type="submit" variant="accent" className="w-full" size="lg">
              <Calculator className="h-4 w-4" />
              Simular Préstamo
            </Button>
          </form>
        </CardContent>
      </Card>

      <LoanResults
        open={showResults}
        onOpenChange={setShowResults}
        monto={loanData.monto}
        tasaInteres={loanData.tasaInteres}
        cuotas={loanData.cuotas}
        fechaPrimerPago={loanData.fechaPrimerPago}
        pagoPorCuota={loanData.pagoPorCuota}
        montoTotal={loanData.montoTotal}
      />
    </>
  );
};
