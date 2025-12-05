import { db } from "../index.js"
import { roles } from "../Schemas/rolesSchema.js"

async function seed() {
    try {
        await db.insert(roles).values({
            roleID: "b50b032e-58e8-4899-a2ec-004ac2ca50e1",
            name: "SuperAdmin"
        })
        console.log("SuperAdmin created!")
        await db.insert(roles).values({
            roleID: "bf2b5102-3e41-43ee-8455-69fa0d2c638a",
            name: "Administrador de clínica"
        })
        console.log("Administrador de clínica created!")
        await db.insert(roles).values({
            roleID: "5b6a4c0f-8ff5-4d8a-bc79-1d7998e46803",
            name: "Veterinario"
        })
        console.log("Veterinario created!")
        await db.insert(roles).values({
            roleID: "2f0a87cb-83e0-4838-bf2d-3a93d992dbfb",
            name: "Usuario"
        })
        console.log("Usuario created!")
    } catch (error) {
        console.error(error)
    }
}

seed()
