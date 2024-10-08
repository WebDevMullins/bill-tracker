export type Bill = {
	_id: string
	amount: number
	dueDate: string
	isPaid: boolean
	name: string
}

export type Payee = {
	_id: string
	name: string
	website: string
}
