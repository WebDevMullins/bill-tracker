import { NewPayeeForm } from '@/components/forms/new-payee-form'
import { SheetForm } from '@/components/sheets/sheet-form'

export function NewPayeeSheet() {
	return (
		<SheetForm
			description='Create a new payee'
			form={<NewPayeeForm />}
			title='New Payee'
		/>
	)
}
