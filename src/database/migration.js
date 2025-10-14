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
    CREATE TABLE IF NOT EXISTS species (
      specieID TEXT PRIMARY KEY,
      type TEXT NOT NULL
  
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS breeds (
      breedID TEXT PRIMARY KEY,
      specieID TEXT NOT NULL,
      breed_name  TEXT NOT NULL,
      FOREIGN KEY (specieID) REFERENCES species(specieID)
    )
  `)


   await tursoApp.execute(`
     CREATE TABLE IF NOT EXISTS pets (
      petID TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      last_name TEXT,
      weight INTEGER NOT NULL,
      birth_date DATE NOT NULL,
      specieID TEXT NOT NULL,
      breedID TEXT NOT NULL,
      sex TEXT NOT NULL,
      color TEXT,
      FOREIGN KEY (specieID) REFERENCES species(specieID),
      FOREIGN KEY (breedID) REFERENCES breeds(breedID)
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS appointments (
      appointmentID TEXT PRIMARY KEY,
      date DATE NOT NULL,
      petID TEXT NOT NULL,
      userID TEXT NOT NULL,
      consultation TEXT,
      place TEXT,
      observations TEXT,
      FOREIGN KEY (userID) REFERENCES users(userID),
      FOREIGN KEY (petID) REFERENCES pets(petID)
    )
  `)

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS medical_history (
      medical_historyID TEXT PRIMARY KEY,
      date DATE NOT NULL,
      record_number TEXT NOT NULL,
      reason TEXT,
      description TEXT,
      petID TEXT,
      observations TEXT,
      FOREIGN KEY (petID) REFERENCES pets(petID)
    )
  `)

   await tursoApp.execute(`
   CREATE TABLE IF NOT EXISTS treatments (
     treatmentID TEXT PRIMARY KEY,
     medical_historyID TEXT NOT NULL,
     treatment_name TEXT NOT NULL,
     description TEXT,
     start_date DATE NOT NULL,
     end_date DATE,
     dosage TEXT,
     frequency TEXT,
     observations TEXT,
     FOREIGN KEY (medical_historyID) REFERENCES medical_history(medical_historyID)
    )
  `)
  await tursoApp.execute(`
   CREATE TABLE IF NOT EXISTS vaccines (
      vaccineID TEXT PRIMARY KEY,
      medical_historyID TEXT NOT NULL,
      vaccine_name TEXT NOT NULL,
      description TEXT,
      application_date DATE NOT NULL,
      next_date DATE,
      dosage TEXT,
      observations TEXT,
      FOREIGN KEY (medical_historyID) REFERENCES medical_history(medical_historyID)
    )
  `)
  console.log("Tables created successfully")
  } catch (error) {
    console.error(error)
  }
}


up()

async function down() {
 try {
  // await tursoApp.execute(`DROP TABLE IF EXISTS appointments`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS medical_history`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS pets`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS breeds`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS species`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS users`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS specialties`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS roles`)
  // await tursoApp.execute(`DROP TABLE IF EXISTS treatments`)
  await tursoApp.execute(`DROP TABLE IF EXISTS `)
  console.log("Tables deleted successfully")
} catch (error) {
  console.error(error)
}
}
