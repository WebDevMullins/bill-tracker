import { SheetForm } from "./sheet-form"




 export function NewBillSheet() {
 	const { isOpen, onClose } = useSheet()

 	return (
 		<SheetForm description="Create a new bill" form='' title="New Bill" />
 	)
 }