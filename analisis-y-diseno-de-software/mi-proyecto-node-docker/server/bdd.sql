-- ======================================================================
-- Re-init limpio (en orden correcto por FKs)
-- ======================================================================
DROP TABLE IF EXISTS user_simulation CASCADE;
DROP TABLE IF EXISTS solicitud_prestamo CASCADE;
DROP TABLE IF EXISTS usuario CASCADE;

-- Para UUID (gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ======================================================================
-- Tabla: usuario
-- ======================================================================
CREATE TABLE usuario (
  rut_cliente   INT PRIMARY KEY,
  nombre_cliente    VARCHAR(50)  NOT NULL,
  apellido_cliente  VARCHAR(50)  NOT NULL,
  email             VARCHAR(100) NOT NULL UNIQUE,
  contrasena        TEXT         NOT NULL,
  created_at        TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Actualiza updated_at automáticamente
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_usuario_updated ON usuario;
CREATE TRIGGER trg_usuario_updated
BEFORE UPDATE ON usuario
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ======================================================================
-- Tabla: solicitud_prestamo
-- ======================================================================
CREATE TABLE solicitud_prestamo (
  id_solicitud     SERIAL PRIMARY KEY,
  rut_cliente      INT NOT NULL REFERENCES usuario(rut_cliente) ON DELETE CASCADE,
  monto_cliente    NUMERIC(12,2) NOT NULL CHECK (monto_cliente > 0),
  cant_cuotas      INT NOT NULL CHECK (cant_cuotas > 0),
  fecha_solicitud  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_solicitud_rut ON solicitud_prestamo(rut_cliente);
CREATE INDEX IF NOT EXISTS idx_solicitud_fecha ON solicitud_prestamo(fecha_solicitud);

-- Trigger updated_at
DROP TRIGGER IF EXISTS trg_solicitud_updated ON solicitud_prestamo;
CREATE TRIGGER trg_solicitud_updated
BEFORE UPDATE ON solicitud_prestamo
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ======================================================================
-- Tabla: user_simulation  (simulaciones guardadas por usuario)
-- ======================================================================
CREATE TABLE user_simulation (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rut_cliente   INT NOT NULL REFERENCES usuario(rut_cliente) ON DELETE CASCADE,
  data          JSONB NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_simulation_rut ON user_simulation(rut_cliente);
CREATE INDEX IF NOT EXISTS idx_user_simulation_created ON user_simulation(created_at);

-- Límite de 5 simulaciones por usuario (concurrency-safe)
CREATE OR REPLACE FUNCTION enforce_sim_limit() RETURNS TRIGGER AS $$
DECLARE
  cnt INT;
BEGIN
  SELECT COUNT(*) INTO cnt FROM user_simulation WHERE rut_cliente = NEW.rut_cliente;
  IF cnt >= 5 THEN
    RAISE EXCEPTION 'SIM_LIMIT_REACHED';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_sim_limit ON user_simulation;
CREATE TRIGGER trg_enforce_sim_limit
BEFORE INSERT ON user_simulation
FOR EACH ROW EXECUTE FUNCTION enforce_sim_limit();
