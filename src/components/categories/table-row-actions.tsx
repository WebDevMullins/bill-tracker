'use client'

import { type Row } from '@tanstack/react-table'
import { MoreHorizontalIcon } from 'lucide-react'
import Link from 'next/link'
import { z } from 'zod'

// import { Id } from '../../../convex/_generated/dataModel'
// import { DeleteBill } from './delete-bill'
// import { PayBill } from './pay-bill'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
// import { UnpayBill } from './unpay-bill'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

const categorySchema = z.object({
	_id: z.string(),
	name: z.string()
})

export function TableRowActions<TData>({
	row
}: DataTableRowActionsProps<TData>) {
	const category = categorySchema.parse(row.original)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontalIcon className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{category.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Link href={`/categories/${category._id}`}>
						View category details
					</Link>
				</DropdownMenuItem>
				{/* {bill.isPaid ? (
					<UnpayBill billId={bill._id as Id<'bills'>} />
				) : (
					<PayBill billId={bill._id as Id<'bills'>} />
				)} */}
				<DropdownMenuSeparator />
				{/* <DeleteBill */}
				{/* billId={bill._id as Id<'bills'>} */}
				{/* // isRecurring={bill.isRecurring} */}
				{/* // recurringId={bill.recurringId ?? undefined} */}
				{/* /> */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
