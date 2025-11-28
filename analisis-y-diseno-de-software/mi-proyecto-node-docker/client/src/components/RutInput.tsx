import React, { useState, useEffect } from "react";
import { formatearRut, limpiarRut, validarRut } from "@/lib/rut";

interface RutInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const RutInput: React.FC<RutInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  placeholder = "12345678-9",
  className = "",
  required = false,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // 1) limpiar caracteres raros
    input = limpiarRut(input);

    // 2) normalizar formato simple con formatearRut (SIN puntos)
    const formatted = formatearRut(input);

    setLocalValue(formatted);
    onChange(formatted);
    setValidationError("");
  };

  const handleBlur = () => {
    if (localValue && localValue.length > 1) {
      if (!validarRut(localValue)) {
        setValidationError("El dígito verificador no es válido");
      } else {
        setValidationError("");
      }
    }

    if (onBlur) onBlur();
  };

  const displayError = error || validationError;

  return (
    <div className="w-full">
      <input
        type="text"
        name="rut"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${displayError ? "border-red-500" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${className}
        `}
        required={required}
        disabled={disabled}
        maxLength={11} // 9 dígitos + '-' + DV
      />
      {displayError && (
        <p className="mt-1 text-sm text-red-600">{displayError}</p>
      )}
    </div>
  );
};

export default RutInput;
