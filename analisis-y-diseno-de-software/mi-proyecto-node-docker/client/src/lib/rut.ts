export function limpiarRut(rut: string): string {
  return rut.replace(/[^0-9kK-]/g, "").toUpperCase();
}

// AGREGA GUION AUTOMÁTICAMENTE AL ESCRIBIR
export function formatearRut(rut: string): string {
  let limpio = limpiarRut(rut).replace(/\./g, "");

  // quitar guiones extra
  limpio = limpio.replace(/-/g, "");

  // si hay menos de 2 caracteres → aún no hay DV
  if (limpio.length <= 1) return limpio;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  return `${cuerpo}-${dv}`;
}

export function validarRut(rut: string): boolean {
  const cleanRUT = rut.replace(/[.-]/g, "").toUpperCase();
  if (cleanRUT.length < 2) return false;

  const rutBody = cleanRUT.slice(0, -1);
  const rutDigit = cleanRUT.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += parseInt(rutBody[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDigit = 11 - (sum % 11);
  const finalDigit =
    expectedDigit === 11 ? "0" :
    expectedDigit === 10 ? "K" :
    expectedDigit.toString();

  return rutDigit === finalDigit;
}