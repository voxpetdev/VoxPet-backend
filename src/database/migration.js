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
