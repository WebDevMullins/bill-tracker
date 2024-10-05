import { NewBillForm } from '@/components/forms/new-bill-form'
import { SheetForm } from '@/components/sheets/sheet-form'

export function NewBillSheet() {
	return (
		<SheetForm
			description='Create a new bill'
			form={<NewBillForm />}
			title='New Bill'
		/>
	)
}
