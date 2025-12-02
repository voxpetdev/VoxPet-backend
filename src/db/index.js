import 'dotenv/config'
import { drizzle } from "drizzle-orm/libsql"
import { tursoApp } from "#src/config/turso.config.js"

export const db = drizzle(tursoApp)