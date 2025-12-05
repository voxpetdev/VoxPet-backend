import { db } from "../index.js"
import { specie } from "../Schemas/specieSchema.js"

async function seed() {
    try {
        await db.insert(specie).values({
            name: "Canino"
        })
        console.log("canino creado")
        await db.insert(specie).values({
            name: "Felino"
        })
        console.log("felino creado")
    } catch (error) {
        console.error(error)
    }
}

seed()
