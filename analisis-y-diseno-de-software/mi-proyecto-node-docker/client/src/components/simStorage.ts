// Manejo de simulaciones guardadas en localStorage (máx 5)
export const SIMS_KEY = "simulaciones_prestamo:v1";
export const SIM_LIMIT = 5;

export type Simulation = {
  // Ajusta las claves a lo que ya tengas; el index signature deja pasar campos extra
  monto?: number;
  tasa?: number;
  plazo?: number;
  sistema?: string;     // francés/alemán/etc si aplicara
  cuotaMensual?: number;
  totalIntereses?: number;
  [k: string]: unknown; // permite cualquier cosa adicional que generes
};

export type StoredSimulation = {
  id: string;
  createdAt: string; // ISO
  data: Simulation;
};

export function getSimulations(): StoredSimulation[] {
  try {
    const raw = localStorage.getItem(SIMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // sanity check mínimo
    return parsed.filter((x) => x && typeof x === "object");
  } catch {
    return [];
  }
}

function setSimulations(list: StoredSimulation[]) {
  localStorage.setItem(SIMS_KEY, JSON.stringify(list));
  // notifica a la UI que hubo cambios
  try {
    window.dispatchEvent(new Event("simulations:changed"));
  } catch {}
}

/** Devuelve {ok:false, reason:"limit"} si ya hay 5 */
export function addSimulation(sim: Simulation): { ok: boolean; reason?: "limit"; item?: StoredSimulation } {
  const list = getSimulations();
  if (list.length >= SIM_LIMIT) return { ok: false, reason: "limit" };

  const item: StoredSimulation = {
    id: (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
    data: sim,
  };
  setSimulations([item, ...list]); // al inicio
  return { ok: true, item };
}

export function removeSimulation(id: string) {
  const next = getSimulations().filter((x) => x.id !== id);
  setSimulations(next);
  return next;
}

export function clearSimulations() {
  setSimulations([]);
}
