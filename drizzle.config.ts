import { env } from '@/env'
import { type Config } from 'drizzle-kit'

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL is required')
}

export default {
	schema: './src/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL
	},
	tablesFilter: ['t3-drizzle_*']
} satisfies Config
