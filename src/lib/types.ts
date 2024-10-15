export type Bill = {
	_id: string
	amount: number
	categoryId: string
	dueDate: string
	isPaid: boolean
	payeeName: string
	payeeId: string
}

export type Payee = {
	_id: string
	name: string
	website: string
}
