import { tursoApp } from "#src/turso.config.js";

async function up() {
  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS rol (
      id_rol TEXT PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      especialidad TEXT NOT NULL
    );
  `);

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id_usuario TEXT PRIMARY KEY NOT NULL,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      tipo_documento TEXT NOT NULL,
      numero_documento INTEGER NOT NULL,
      id_rol TEXT NOT NULL,
      numero_contacto TEXT NOT NULL,
      correo_electronico TEXT UNIQUE NOT NULL,
      direccion TEXT NOT NULL,
      contrasena TEXT NOT NULL,
      FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
    );
  `);
}

up();

async function down() {
  await tursoApp.execute(`DROP TABLE IF EXISTS usuarios;`);
  await tursoApp.execute(`DROP TABLE IF EXISTS rol;`);
}
