import { createClient } from '@libsql/client'
import userRoutes from '#src/routes/userRoutes.js'
import roleRoutes from '#src/routes/roleRoutes.js'
import authRoutes from '#src/routes/authRoutes.js'
import DatesRoutes from '#src/routes/DatesRoutes.js'
import petsRoutes from '#src/routes/petsRoutes.js'
import clinicalHistoryRoutes from '#src/routes/clinicalHistoryRoutes.js'
import treatmentRoutes from '#src/routes/treatmentRoutes.js'
import express from 'express'
import morgan from 'morgan'

export class App {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.apiRoute = '/api/v1'

        // this.connectDatabase()
        this.middlewares()
        this.routes()
        this.errorHandler()
    }

    connectDatabase() {
        try {
            this.db = createClient({
                url: process.env.DATABASE_URL,
                authToken: process.env.DATABASE_AUTH_TOKEN
            })
            console.log("Conectado a la base de datos Turso/libSQL")
        } catch (error) {
            console.error("Error al conectarse a la base de datos:", error)
            process.exit(1)
        }
    }

    middlewares() {
        this.app.use(morgan(process.env.LOG_FORMAT))
        this.app.use(express.json())
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.send({ message: "API de VoxPet funcionando!" })
        })
        this.app.use(`${this.apiRoute}/dates`, DatesRoutes)
        this.app.use(`${this.apiRoute}/users`, userRoutes)
        this.app.use(`${this.apiRoute}/roles`, roleRoutes)
        this.app.use(`${this.apiRoute}/auth`, authRoutes)
        this.app.use(`${this.apiRoute}/pets`, petsRoutes)
        this.app.use(`${this.apiRoute}/clinical`, clinicalHistoryRoutes)
        this.app.use(`${this.apiRoute}/treatment`, treatmentRoutes)
    }

    errorHandler() {
        this.app.use((error, req, res, next) => {
            console.error("Error en el servidor:", error)
            res.status(500).send({ message: "Error interno del servidor" })
        })
    }

    listen() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${this.port}`);
        })
    }
}