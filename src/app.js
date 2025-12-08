import userRoutes from '#src/routes/userRoutes.js'
import roleRoutes from '#src/routes/roleRoutes.js'
import authRoutes from '#src/routes/authRoutes.js'
import petsRoutes from '#src/routes/petsRoutes.js'
import specieRoutes from '#src/routes/specieRoutes.js'
import specialtiesRoutes from '#src/routes/specialtiesRoutes.js'
import breedRouters from '#src/routes/breedRoutes.js'
import appointmentsRoutes from '#src/routes/appointmentsRoutes.js'
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
        this.app.get("/", (_, res) => {
            res.send("<h1 style='h1 {margin: auto}'>Usuario confirmado correctamente, ahora puedes cerrar esta pestaña e iniciar sesión.</h1>")
        })
        this.app.get('/health', (_, res) => { res.status(200).send({ success:true, message: 'Servidor funcionando correctamente', timestamp: new Date().toISOString() }) })
        this.app.use(`${this.apiRoute}/users`, userRoutes)
        this.app.use(`${this.apiRoute}/roles`, roleRoutes)
        this.app.use(`${this.apiRoute}/pets`, petsRoutes)
        this.app.use(`${this.apiRoute}/auth`, authRoutes)
        this.app.use(`${this.apiRoute}/species`, specieRoutes)
        this.app.use(`${this.apiRoute}/specialties`, specialtiesRoutes)
        this.app.use(`${this.apiRoute}/breeds`, breedRouters)
        this.app.use(`${this.apiRoute}/appointments`, appointmentsRoutes)
    }

    errorHandler() {
        this.app.use((error, _, res, next) => {
            console.error("Error en el servidor:", error)
            res.status(500).send({ message: "Error interno del servidor" })
            next()
        })
    }

    async listen() {
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