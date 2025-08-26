import { tursoApp } from "#src/turso.config.js"

async function up() {
    await tursoApp.executeMultiple(`
        INSERT INTO roles values ("b50b032e-58e8-4899-a2ec-004ac2ca50e1", "SuperAdmin");
        INSERT INTO roles values ("bf2b5102-3e41-43ee-8455-69fa0d2c638a", "Administrador de clínica");
        INSERT INTO roles values ("5b6a4c0f-8ff5-4d8a-bc79-1d7998e46803", "Veterinario");
        INSERT INTO roles values ("2f0a87cb-83e0-4838-bf2d-3a93d992dbfb", "Usuario");
    `)
}

async function down() {
    await tursoApp.execute('DROP TABLE')
}

up()