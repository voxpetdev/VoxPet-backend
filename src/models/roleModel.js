import { tursoApp } from "#src/turso.config.js"

class roleModel {
    async getAll() {
        try {
            const res = await tursoApp.execute("SELECT * FROM rol")
            return { code: 200, records: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting roles." }
        }
    }

    async getById(roleID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM rol WHERE id_rol = ?",
                args: [roleID]
            })
            return { code: 200, record: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the role." }
        }
    }
}

export default new roleModel()