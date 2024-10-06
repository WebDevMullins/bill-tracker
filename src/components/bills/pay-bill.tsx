import { useMutation } from 'convex/react'
import { DollarSignIcon } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type PayBillProps = {
	billId: Id<'bills'>
}

export function PayBill({ billId }: PayBillProps) {
	const paybill = useMutation(api.bills.payBill)

	const handlePay = async (id: Id<'bills'>) => {
		try {
			await paybill({ id })
			toast.success('Bill paid')
		} catch (error) {
			console.error(error)
			toast.error('Error paying bill')
		}
	}

	return (
		<DropdownMenuItem
			onSelect={() => {
				handlePay(billId)
			}}
			className='text-emerald-500'>
			<DollarSignIcon className='mr-2 size-4' />
			<span>Pay bill</span>
		</DropdownMenuItem>
	)
}
