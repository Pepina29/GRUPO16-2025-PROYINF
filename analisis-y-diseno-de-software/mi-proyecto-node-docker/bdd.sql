CREATE TABLE usuario (
    rut_cliente INT PRIMARY KEY,
    nombre_cliente VARCHAR(50),
    apellido_cliente VARCHAR(50),
    password VARCHAR(50) NOT NULL 
);

CREATE TABLE solicitud_prestamo (
    id_solicitud INT PRIMARY KEY,
    rut_cliente INT,
    monto_cliente INT,
    cant_cuotas INT,
    FOREIGN KEY (rut_cliente) REFERENCES usuario(rut_cliente)
        ON DELETE CASCADE 
);