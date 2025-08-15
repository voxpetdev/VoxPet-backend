import { createClient } from "@libsql/client"

const tursoConfig = {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
}

export const tursoApp = createClient(tursoConfig)

