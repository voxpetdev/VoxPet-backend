import { createClient } from '@libsql/client'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

export class App {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000

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
    }

    errorHandler() {
        this.app.use((error, req, res, next) => {
            console.error("Error en el servidor:", error)
            res.status(500).send({ message: "Error interno del servidor" })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${this.port}`);
        })
    }
}