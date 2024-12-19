import { db } from './drizzle'
import { payees } from './schema'

export async function getPayees() {
	try {
		const payeeResults = await db.select().from(payees)
		return payeeResults
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.stack)
		}
	}
}
