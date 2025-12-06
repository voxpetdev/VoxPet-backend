import { tursoApp } from "#src/config/turso.config.js"

class AppointmentsModel {
    async getAll() {
        try {
            const res = await tursoApp.execute(`
        SELECT * FROM appointments
            `)
            return { code: 200, data: res.rows }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the appointments." }
        }
    }
    
    async getById(appointmentID) {
        try {
            const res = await tursoApp.execute({
                sql: "SELECT * FROM specialties WHERE appointmentID= ?",
                args: [appointmentID]
            })
            return { code: 200, data: res.rows[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the appointment" }
        }
    }

    async create(data) {
        const { date, consultation, place, observations, petID, useID, status} = data
        try {
            await tursoApp.execute({
                sql: "INSERT INTO appointments (date, consultation, place, observations, petID, useID, status) values (?, ?, ?, ?, ?, ?. ?)",
                args: [date, consultation, place, observations, petID, useID, status]
            })

            return { code: 200, message: 'Created successfully.'
            }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating .' }
        }
    }

    async update(appointmentID, data) {
        try {
            const { date, consultation, place, observations, petID, useID, status} = data

            const res = await tursoApp.execute({
                sql: "SELECT * FROM appointments WHERE appointmentID = ?",
                args: [appointmentID]
            })

            await tursoApp.execute({
                sql: "UPDATE appointments SET date = ?, consultation = ?, place = ?, observations = ?, petID=?, useID=?, status = ? WHERE appointmentID = ?",
                args: [date, consultation, place, observations, petID, useID, status, appointmentID]
            })

            return { code: 200, message: " updated successfully." }

        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable( appointmentID) {
        try {
            await tursoApp.execute({
                sql: "UPDATE appointments SET status = 'INACTIVE' WHERE appointmentID = ?",
                args: [ appointmentID]
            })
            return { code: 200 }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling.' }
        }
    }

}

export default new AppointmentsModel()