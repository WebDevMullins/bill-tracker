import { NewCategoryForm } from '@/components/forms/new-category-form'
import { SheetForm } from '@/components/sheets/sheet-form'

export function NewCategorySheet() {
	return (
		<SheetForm
			description='Create a new category'
			form={<NewCategoryForm />}
			title='New Category'
		/>
	)
}
