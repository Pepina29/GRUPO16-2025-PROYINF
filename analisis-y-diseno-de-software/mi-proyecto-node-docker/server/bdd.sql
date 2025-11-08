-- Eliminar tablas si existen (para empezar limpio)
DROP TABLE IF EXISTS solicitud_prestamo CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- Crear tabla de usuarios
CREATE TABLE usuario (
    rut_cliente INT PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Algo pasa que no está creando la tabla.
CREATE TABLE solicitud_prestamo (
    id_solicitud SERIAL PRIMARY KEY,
    rut_cliente INT NOT NULL,
    monto_cliente DECIMAL(12, 2) NOT NULL,
    cant_cuotas INT NOT NULL,
    fecha_solicitud TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_usuario
        FOREIGN KEY (rut_cliente) 
        REFERENCES usuario(rut_cliente) 
        ON DELETE CASCADE
);