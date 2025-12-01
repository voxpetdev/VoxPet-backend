import { createClient } from "@libsql/client"

const tursoConfig = {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
}

export const tursoApp = createClient(tursoConfig)

export async function InitializeDatabase() {
  try {
    await tursoApp.batch([
      "CREATE TABLE IF NOT EXISTS roles(roleID TEXT PRIMARY KEY, name TEXT NOT NULL)",
      "INSERT INTO roles values ('b50b032e-58e8-4899-a2ec-004ac2ca50e1', 'SuperAdmin')",
      "INSERT INTO roles values ('bf2b5102-3e41-43ee-8455-69fa0d2c638a', 'Administrador de clínica')",
      "INSERT INTO roles VALUES ('5b6a4c0f-8ff5-4d8a-bc79-1d7998e46803', 'Veterinario')",
      "INSERT INTO roles VALUES ('2f0a87cb-83e0-4838-bf2d-3a93d992dbfb', 'Usuario')",
    ])

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS specialties(
        specialtyID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS users(
        userID TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE,
        documentType TEXT,
        document INTEGER,
        roleID TEXT NOT NULL,
        specialtyID TEXT,
        phone TEXT NOT NULL,
        address TEXT,
        status TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (roleID) REFERENCES roles(roleID),
        FOREIGN KEY (specialtyID) REFERENCES specialties(specialtyID)
      )
    `)

  await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS specie(
        specieID INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS breed(
        breedID INTEGER PRIMARY KEY AUTOINCREMENT,
        specieID  NOT NULL,
        name TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (specieID) REFERENCES specie(specieID)
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS pet(
        petID INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        last_name TEXT,
        weight INTEGER NOT NULL,
        birthday DATE NOT NULL,
        breedID INTEGER NOT NULL,
        genre TEXT NOT NULL,
        color TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (breedID) REFERENCES breed(breedID)
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS users_pets(
      users_petsID INTEGER PRIMARY KEY AUTOINCREMENT,
      userID INTEGER NOT NULL,
      petID INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userID) REFERENCES users(userID),
      FOREIGN KEY (petID) REFERENCES pet(petID)
      )`)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS appointments(
        appointmentID INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        petID INTEGER NULL,
        userID INTEGER NULL,
        consultation TEXT,
        place TEXT,
        observations TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userID) REFERENCES users(userID),
        FOREIGN KEY (petID) REFERENCES pet(petID)
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS medical_history(
        medical_historyID INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATE NOT NULL,
        record_number TEXT NOT NULL,
        reason TEXT,
        description TEXT,
        petID INTEGER NOT NULL,
        observations TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (petID) REFERENCES pet(petID)
      )
    `)

    await tursoApp.execute(`
      CREATE TABLE IF NOT EXISTS treatments(
        treatmentID INTEGER PRIMARY KEY AUTOINCREMENT,
        medical_historyID INTEGER NOT NULL,
        treatment_name TEXT NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE,
        dosage TEXT,
        frequency TEXT,
        observations TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (medical_historyID) REFERENCES medical_history(medical_historyID)
      )
    `)
    console.log("Tables created successfully")
  } catch (error) {
    console.error(error)
  }
}

export async function down() {
  try {
    await tursoApp.batch([
      "DROP TABLE IF EXISTS treatments",
      "DROP TABLE IF EXISTS medical_history",
      "DROP TABLE IF EXISTS appointments",
      "DROP TABLE IF EXISTS users_pets",
      "DROP TABLE IF EXISTS pet",
      "DROP TABLE IF EXISTS breed",
      "DROP TABLE IF EXISTS specie",
      "DROP TABLE IF EXISTS users",
      "DROP TABLE IF EXISTS specialties",
      "DROP TABLE IF EXISTS roles"
    ]);
    console.log("Tablas eliminadas");
  } catch (error) {
    console.error(error);
  }
  
}

