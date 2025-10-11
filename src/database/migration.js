import { tursoApp } from "#src/turso.config.js"

async function up() {

  try {
    await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      roleID TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS specialties (
      specialtyID TEXT PRIMARY KEY,
      name TEXT NOT NULL
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS users (
      userID TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      documentType TEXT,
      document INTEGER,
      roleID TEXT NOT NULL,
      specialtyID TEXT,
      phone TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      address TEXT,
      password TEXT NOT NULL,
      FOREIGN KEY (roleID) REFERENCES roles(roleID),
      FOREIGN KEY (specialtyID) REFERENCES specialties(specialtyID)
  
    )
  `)

   await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS especies (
      especieID TEXT PRIMARY KEY,
      tipo TEXT NOT NULL
  
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS razas (
      razaID TEXT PRIMARY KEY,
      especieID TEXT NOT NULL,

      nombre_raza TEXT NOT NULL,
      FOREIGN KEY (especieID) REFERENCES especies(especieID)
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS sexos (
      sexoID TEXT PRIMARY KEY,
      sexo_mascota TEXT NOT NULL
  
    )
  `)

   await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS mascotas (
      mascotasID TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      aoellido TEXT,
      peso INTEGER NOT NULL,
      fecha_nacimiento DATE NOT NULL,
      especieID TEXT NOT NULL,
      razaID TEXT NOT NULL,
      sexoID TEXT NOT NULL,
      color TEXT,
      FOREIGN KEY (especieID) REFERENCES especies(especieID),
      FOREIGN KEY (razaID) REFERENCES razas(razaID),
      FOREIGN KEY (sexoID) REFERENCES sexos(sexoID)
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS citas (
      citasID TEXT PRIMARY KEY,
      fecha DATE NOT NULL,
      mascotaID TEXT NOT NULL,
      userID TEXT NOT NULL,
      consulta TEXT,
      lugar TEXT,
      observaciones TEXT,
      FOREIGN KEY (userID) REFERENCES users(userID),
      FOREIGN KEY (mascotaID) REFERENCES mascotas(mascotaID)
  
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS histroria_clinica (
      chistroria_clinicaID TEXT PRIMARY KEY,
      fecha DATE NOT NULL,
      radicado INTEGER NOT NULL,
      motivo TEXT,
      descripcion TEXT,
      mascotaID TEXT,
      observaciones TEXT,
      FOREIGN KEY (mascotaID) REFERENCES mascotas(mascotaID)
  
    )
  `)
  console.log("Tablas creadas")
  } catch (error) {
    console.error(error)
  }
}

up()

async function down() {
  try {
    await tursoApp.execute(`DROP TABLE IF EXISTS users`)
    await tursoApp.execute(`DROP TABLE IF EXISTS specialties`)
    await tursoApp.execute(`DROP TABLE IF EXISTS roles`)
    console.log("Tablas eliminadas")
  } catch (error) {
    console.error(error)
  }
}
