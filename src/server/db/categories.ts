import { db } from './drizzle'
import { categories } from './schema'

export async function getCategories() {
	try {
		const categoriesResults = await db.select().from(categories)
		return categoriesResults
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.stack)
		}
	}
}
