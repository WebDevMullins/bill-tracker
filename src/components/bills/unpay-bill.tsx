import { useMutation } from 'convex/react'
import { CircleMinusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '@/../convex/_generated/api'
import { Id } from '@/../convex/_generated/dataModel'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

type PayBillProps = {
	billId: Id<'bills'>
}

export function UnpayBill({ billId }: PayBillProps) {
	const unpayBill = useMutation(api.bills.unpayBill)

	const handleUnpay = async (id: Id<'bills'>) => {
		try {
			await unpayBill({ id })
			toast.success('Bill unpaid')
		} catch (error) {
			console.error(error)
			toast.error('Error unpaying bill')
		}
	}

	return (
		<DropdownMenuItem
			onSelect={() => {
				handleUnpay(billId)
			}}
			className='text-muted-foreground'>
			<CircleMinusIcon className='mr-2 size-4' />
			<span>Unpay bill</span>
		</DropdownMenuItem>
	)
}
