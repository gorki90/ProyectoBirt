-- Tabla principal: identificacion_localizacion
CREATE TABLE identificacion_localizacion (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    especie VARCHAR(100),
    nombre_comun VARCHAR(100),
    geom GEOMETRY(Point, 3857),  -- Campo geom con el tipo de dato geoespacial y SRID 3857,
    barrio VARCHAR(150),
    calle VARCHAR(200),
    notas_ubicacion VARCHAR(500)
);
-- Tabla auxiliar: datos_dasometricos
CREATE TABLE datos_dasometricos (
    id SERIAL PRIMARY KEY,
    arbol_id INTEGER REFERENCES identificacion_localizacion(id) ON DELETE CASCADE,-- para que se eliminan todos los registros relacionados una vez eliminado en la tabla prinicpal
    altura INTEGER,
    diametro INTEGER,
    altura_primera_rama INTEGER,
    morfologia VARCHAR(100),
    tipo_alcorque VARCHAR(100),
    disposicion VARCHAR(100)
);

-- Tabla auxiliar: estado_sanitario
--en el script de la tabla estado_sanitario hay un error. 
--La columna daños _abioticos se tiene que cambiar por afecciones _abioticas para que corresponda con el proyecto de angular. 
--Lo cambié para que la ñ no diera problemas
CREATE TABLE estado_sanitario (
    id SERIAL PRIMARY KEY,
    arbol_id INTEGER REFERENCES identificacion_localizacion(id) ON DELETE CASCADE,
    estado VARCHAR(100),
    enfermedades VARCHAR(200),
    plagas VARCHAR(200),
    afecciones_abioticos VARCHAR(200),
    riesgos VARCHAR(300),
    notas VARCHAR(500)
);

-- Tabla auxiliar: tareas
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    arbol_id INTEGER REFERENCES identificacion_localizacion(id) ON DELETE CASCADE,
    tipo_accion VARCHAR(100),
    descripcion_accion VARCHAR(500),
    prioridad VARCHAR(100),
    fecha_comienzo DATE,
    fecha_limite DATE,
    estado_accion VARCHAR(100)
);
