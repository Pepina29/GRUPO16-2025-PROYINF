import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSimulations,
  removeSimulation,
  clearSimulations,
  SIM_LIMIT,
  StoredSimulation,
} from "@/components/simStorage";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, TrendingUp, Percent, Trash2, ArrowRight } from "lucide-react";

const Perfil = () => {
  const [list, setList] = useState<StoredSimulation[]>([]);
  const navigate = useNavigate();

  const load = () => setList(getSimulations());
  useEffect(() => { load(); }, []);

  const onDelete = (id: string) => setList(removeSimulation(id));

  const onClear = () => {
    if (confirm("¿Eliminar TODAS las simulaciones guardadas?")) {
      clearSimulations();
      setList([]);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(value);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-CL");

  const goSolicitar = (item: StoredSimulation) => {
    const d: any = item.data;
    navigate("/solicitar-prestamo", {
      state: {
        monto: d.monto ?? 0,
        tasaInteres: d.tasa ?? 0,
        cuotas: d.cuotas ?? 0,
        fechaPrimerPago: d.fechaPrimerPago ?? "",
        pagoPorCuota: d.pagoPorCuota ?? 0,
        montoTotal: d.montoTotal ?? 0,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">Perfil</h1>
            <p className="text-sm text-muted-foreground">
              Simulaciones guardadas (máx. {SIM_LIMIT}). Capacidad restante: {Math.max(0, SIM_LIMIT - list.length)}.
            </p>
          </div>
          <Button variant="outline" onClick={onClear} disabled={list.length === 0}>
            Vaciar todo
          </Button>
        </div>

        {list.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            No tienes simulaciones guardadas. Ve al simulador y usa “Guardar en Perfil”.
          </div>
        ) : (
          <div className="grid gap-4">
            {list.map((item, idx) => {
              const d: any = item.data;
              return (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Badge variant="secondary">#{list.length - idx}</Badge>
                      Simulación
                    </CardTitle>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        Guardada: {formatDate(item.createdAt)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => onDelete(item.id)}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-0">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg border p-3">
                        <div className="mb-1 text-xs text-muted-foreground">Monto</div>
                        <div className="flex items-center gap-2 text-lg font-bold">
                          <DollarSign className="h-4 w-4 text-accent" />
                          {formatCurrency(d.monto ?? 0)}
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="mb-1 text-xs text-muted-foreground">Pago por cuota</div>
                        <div className="flex items-center gap-2 text-lg font-semibold text-accent">
                          <TrendingUp className="h-4 w-4" />
                          {formatCurrency(d.pagoPorCuota ?? 0)}
                        </div>
                      </div>

                      <div className="rounded-lg border p-3">
                        <div className="mb-1 text-xs text-muted-foreground">Monto total</div>
                        <div className="text-lg font-semibold">{formatCurrency(d.montoTotal ?? 0)}</div>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Percent className="h-3 w-3" /> <span>Tasa anual</span>
                        <span className="ml-1 text-foreground font-medium">{d.tasa ?? "-"}%</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3 w-3" /> <span>Primer pago</span>
                        <span className="ml-1 text-foreground font-medium">{d.fechaPrimerPago ?? "-"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <HashIcon /> <span>Cuotas</span>
                        <span className="ml-1 text-foreground font-medium">{d.cuotas ?? "-"}</span>
                      </div>
                    </div>

                    <Separator />
                  </CardContent>

                  <CardFooter className="flex items-center justify-end">
                    <Button onClick={() => goSolicitar(item)}>
                      Solicitar préstamo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;

function HashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 text-current" fill="none" stroke="currentColor">
      <path strokeWidth="2" d="M10 3L8 21M16 3l-2 18M4 8h16M3 16h16" />
    </svg>
  );
}
