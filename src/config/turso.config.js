import { createClient } from "@libsql/client"

export const tursoApp = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
})
