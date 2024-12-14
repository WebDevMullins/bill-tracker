import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import { env } from '../../../env'
import * as schema from './schema'

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined')
}

const sql = neon(env.DATABASE_URL!)

export const db = drizzle({
	client: sql,
	schema: schema
})
