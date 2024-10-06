import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'
import { ConfirmDeleteAlertDialog } from '../confirm-delete-alert-dialog'

type DeleteBillProps = {
	billId: Id<'bills'>
}

export function DeleteBill({ billId }: DeleteBillProps) {
	const deleteBill = useMutation(api.bills.deleteBill)

	const handleDelete = async (id: Id<'bills'>) => {
		try {
			await deleteBill({ id })
			toast.success('Bill deleted')
		} catch (error) {
			console.error(error)
			toast.error('Error deleting bill')
		}
	}

	return <ConfirmDeleteAlertDialog onClick={() => handleDelete(billId)} />
}
