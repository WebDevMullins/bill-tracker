export type Bill = {
	_id: string
	amount: number
	categoryName: string
	categoryId: string
	dueDate: string
	isPaid: boolean
	payeeName: string
	payeeId: string
}

export type Category = {
	_id: string
	name: string
}

export type Payee = {
	_id: string
	name: string
	website: string
}
