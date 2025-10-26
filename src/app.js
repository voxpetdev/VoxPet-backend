import userRoutes from '#src/routes/userRoutes.js'
import roleRoutes from '#src/routes/roleRoutes.js'
import authRoutes from '#src/routes/authRoutes.js'
import DatesRoutes from '#src/routes/DatesRoutes.js'
import clinicalHistoryRoutes from '#src/routes/clinicalHistoryRoutes.js'
import treatmentRoutes from '#src/routes/treatmentRoutes.js'
import { InitializeDatabase, down } from '#src/config/turso.config.js'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export class App {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.apiRoute = '/api/v1'

        this.middlewares()
        this.routes()
        this.errorHandler()
    }

    middlewares() {
        this.app.use(morgan(process.env.LOG_FORMAT))
        this.app.use(express.json())
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }))
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS")
            res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

            if (req.method === "OPTIONS") {
                return res.sendStatus(200)
            }

            next()
        })
    }

    routes() {
        this.app.get("/", (req, res) => {
            res.send("<h1 style='h1 {margin: auto}'>Usuario confirmado correctamente, ahora puedes cerrar esta pestaña e iniciar sesión.</h1>")
        })
        this.app.get('/health', (req, res) => { res.status(200).send({ success:true, message: 'Servidor funcionando correctamente', timestamp: new Date().toISOString() }) })
        this.app.use(`${this.apiRoute}/dates`, DatesRoutes)
        this.app.use(`${this.apiRoute}/users`, userRoutes)
        this.app.use(`${this.apiRoute}/roles`, roleRoutes)
        this.app.use(`${this.apiRoute}/auth`, authRoutes)
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
        // await InitializeDatabase()
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`)
            console.log(`📊 Health check: http://localhost:${this.port}/health`)
        })
    }

    getServer() {
    return this.app
  }
}

const appInstance = new App()
export const app = appInstance.getServer()