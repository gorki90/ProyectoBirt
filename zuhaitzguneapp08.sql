create extension postgis
-- Tabla principal: identificacion_localizacion
CREATE TABLE identificacion_localizacion (
id SERIAL PRIMARY KEY,
codigo VARCHAR(10) UNIQUE NOT NULL,
especie VARCHAR(100),
nombre_comun VARCHAR(100),
geom GEOMETRY(Point, 3857), -- Campo geom con el tipo de dato geoespacial y SRID 3857,
barrio VARCHAR(150),
calle VARCHAR(200),
notas_ubicacion VARCHAR(500)
);

-- Tabla auxiliar: datos_dasometricos
CREATE TABLE datos_dasometricos (
id SERIAL PRIMARY KEY,
arbol_id INTEGER REFERENCES
identificacion_localizacion(id) ON DELETE CASCADE,--para que se eliminan todos los registros relacionados una vez eliminado en la tabla prinicpal
altura INTEGER,
diametro INTEGER,
altura_primera_rama INTEGER,
morfologia VARCHAR(100),
tipo_alcorque VARCHAR(100),
disposicion VARCHAR(100)
);

-- Tabla auxiliar: estado_sanitario
CREATE TABLE estado_sanitario (
id SERIAL PRIMARY KEY,
arbol_id INTEGER REFERENCES
identificacion_localizacion(id) ON DELETE CASCADE,
estado VARCHAR(100),
enfermedades VARCHAR(200),
plagas VARCHAR(200),
afecciones_abioticas VARCHAR(200),
riesgos VARCHAR(300),
notas VARCHAR(500)
);

-- Tabla auxiliar: tareas
CREATE TABLE tareas (
id SERIAL PRIMARY KEY,
arbol_id INTEGER REFERENCES
identificacion_localizacion(id) ON DELETE CASCADE,
tipo_accion VARCHAR(100),
descripcion_accion VARCHAR(500),
prioridad VARCHAR(100),
fecha_comienzo DATE,
fecha_limite DATE,
estado_accion VARCHAR(100)
);

INSERT INTO identificacion_localizacion (codigo, especie,
nombre_comun, geom, barrio, calle) VALUES
('0003', 'Fagus sylvatica', 'Haya',
'0101000020110F00006C917AD8E2F913C1F2003BA9446A5441',
'Indautxu', 'Urrutia'),
('0004', 'Betula alba', 'Abedul',
'0101000020110F0000D6E8725ED7F913C1044E80FB4D6A5441',
'Indautxu', 'Urrutia'),
('0006', 'Quercus robur', 'Roble',
'0101000020110F0000D9177D6B1AFA13C137FA18103C6A5441',
'Indautxu', 'Urrutia'),
('0002', 'Quercus robur', 'Roble desl pais',
'0101000020110F00003B6199F5A7F513C1C9DA70371C6A5441', 'La
Casilla', 'Alameda'),
('0005', 'Ligustrum vulgare', 'Aligustre',
'0101000020110F000042E7775683F513C180F6FE6B776A5441', 'Ercilla',
'Ercilla'),
('0007', 'Alnus glutinosa', 'aliso',
'0101000020110F0000410E29361AF613C14146400C296A5441', 'La
Casilla', NULL),
('0008', 'aliso', NULL,
'0101000020110F00003EE8FA2E59FA13C105C33946536A5441',
'Indautxu', NULL),
('0001', 'Quercus robur', 'Roble del pais',
'0101000020110F00008242140AE6F513C19A5ADBFB1C6A5441', 'La
Casilla', 'Alameda');

INSERT INTO tareas (arbol_id, tipo_accion, prioridad,
fecha_comienzo, fecha_limite, estado_accion) VALUES
(5, 'Entecava', 'alta', '2024-11-21', '2024-11-19', 'no
iniciada'),
(1, 'vigilancia ramas dañadas', 'media', NULL, NULL,
'finalizada'),
(1, 'escarda alcorque', 'baja', '2024-11-15', '2024-11-29',
'finalizada'),
(8, 'poda', 'baja', '2024-11-23', '2024-11-29', 'finalizada'),
(5, 'Poda alta', 'baja', '2024-11-20', '2024-11-21',
'empezada'),
(4, 'tala', 'baja', '2024-11-21', '2024-11-28', 'empezada'),
(8, 'desbroce', 'baja', NULL, NULL, 'programada'),
(2, 'rastrillado', 'media', '2024-11-21', NULL, 'programada'),
(1, 'Poda ramas bajas', 'media', '2024-11-20', NULL,
'programada');

INSERT INTO estado_sanitario  (arbol_id, estado, enfermedades, plagas, afecciones_abioticas, riesgos, notas) VALUES
(1,'estado1','enfermedad1','plaga1','afeccion1','riesgo1','nota1'),
(2,'estado2','enfermedad2','plaga2','afeccion2','riesgo2','nota2'),
(3,'estado3','enfermedad3','plaga3','afeccion3','riesgo3','nota3'),
(4,'estado4','enfermedad4','plaga4','afeccion4','riesgo4','nota4'),
(5,'estado5','enfermedad5','plaga5','afeccion5','riesgo5','nota5'),
(6,'estado6','enfermedad6','plaga6','afeccion6','riesgo6','nota6'),
(7,'estado7','enfermedad7','plaga7','afeccion7','riesgo7','nota7'),
(8,'estado8','enfermedad8','plaga8','afeccion8','riesgo8','nota8');

INSERT INTO datos_dasometricos  (arbol_id, altura, diametro, altura_primera_rama, morfologia, tipo_alcorque, disposicion) VALUES
(1,1,1,1,'morfologia1','tipo_alcorque1','disposicion1'),
(2,2,2,2,'morfologia2','tipo_alcorque2','disposicion2'),
(3,3,3,3,'morfologia3','tipo_alcorque3','disposicion3'),
(4,4,4,4,'morfologia4','tipo_alcorque4','disposicion4'),
(5,5,5,5,'morfologia5','tipo_alcorque5','disposicion5'),
(6,6,6,6,'morfologia6','tipo_alcorque6','disposicion6'),
(7,7,7,7,'morfologia7','tipo_alcorque7','disposicion7'),
(8,8,8,8,'morfologia8','tipo_alcorque8','disposicion8');
