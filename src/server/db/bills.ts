import { db } from './drizzle'
import { bills } from './schema'

export async function createBill(
	amount: number,
	categoryId: number,
	categoryName: string,
	dueDate: string,
	isPaid: number,
	payeeName: string,
	payeeId: number
) {
	console.log(
		'createBill',
		amount,
		categoryId,
		categoryName,
		dueDate,
		isPaid,
		payeeName,
		payeeId
	)
}

export async function getBills() {
	try {
		const billResults = await db.select().from(bills)
		return billResults
	} catch (err) {
		if (err instanceof Error) {
			console.error(err.stack)
		}
	}
}
