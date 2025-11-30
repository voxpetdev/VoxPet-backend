import { tursoApp } from "#src/config/turso.config.js"

class BreedModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM breed
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the specie." }
        }
    }
    
}

export default new BreedModel()