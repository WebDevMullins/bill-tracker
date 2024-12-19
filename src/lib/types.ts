export type Bill = {
	id: string
	amount: number
	categoryId: string
	categoryName: string
	dueDate: string
	isPaid: boolean
	payeeName: string
	payeeId: string
}

export type Category = {
	id: string
	name: string
}

export type Payee = {
	id: string
	name: string
	website: string
}
