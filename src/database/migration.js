import { tursoApp } from "#src/turso.config.js";

async function up() {

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS roles (
      roleID TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS specialties (
      specialtyID TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `);

  await tursoApp.execute(`
    CREATE TABLE IF NOT EXISTS users (
      userID TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      documentType TEXT NOT NULL,
      document INTEGER NOT NULL,
      roleID TEXT NOT NULL,
      specialtyID TEXT,
      phone INTEGER NOT NULL,
      email TEXT UNIQUE NOT NULL,
      address TEXT,
      status TEXT NOT NULL,
      password TEXT NOT NULL,
      FOREIGN KEY (roleID) REFERENCES roles(roleID),
      FOREIGN KEY (specialtyID) REFERENCES specialties(specialtyID)
  
    );
  `);
}

up();

async function down() {
  await tursoApp.execute(`DROP TABLE IF EXISTS users;`);
  await tursoApp.execute(`DROP TABLE IF EXISTS specialties;`);
  await tursoApp.execute(`DROP TABLE IF EXISTS roles;`);
}
