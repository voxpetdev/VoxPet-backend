import { db } from "#src/db/index.js"
import { appointments } from "#src/db/Schemas/appointmentsSchema.js"
import { eq } from "drizzle-orm"

class AppointmentsModel {
    async getAll() {
        try {
            const res = await db.select().from(appointments)
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the appointments." }
        }
    }
    
    async getById(appointmentID) {
        try {
            const res = await db.select().from(appointments).where(eq(appointments.appointmentID, appointmentID))
            return { code: 200, data: res[0] }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error getting the appointment" }
        }
    }

    async create(data) {
        try {
            const res = await db.insert(appointments).values(data).returning()
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error creating .' }
        }
    }

    async update(appointmentID, data) {
        try {
            const res = await db.update(appointments).set(data).where(eq(appointments.appointmentID, appointmentID)).returning()
            return { code: 200, data: res }
        } catch (error) {
            console.error(error)
            return { code: 500, message: "Error updating." }
        }
    }

    async disable(appointmentID) {
        try {
            await db.update(appointments).set({ status: "INACTIVE", updatedAt: Date.now() }).where(eq(appointments.appointmentID, appointmentID))
            return { code: 200, message: "appointment disabled." }
        } catch (error) {
            console.error(error)
            return { code: 500, message: 'Error disabling.' }
        }
    }

}

export default new AppointmentsModel()