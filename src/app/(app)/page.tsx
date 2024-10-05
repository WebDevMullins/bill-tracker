'use client'

import { useMutation, useQuery } from 'convex/react'
import { toast } from 'sonner'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

import CreateButton from '@/components/create-button'
import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/data-table/data-table'
import { formatCurrency } from '@/lib/utils'
import { columns } from '@/components/bills/columns'

export default function Home() {
	const bills = useQuery(api.bill.getBills)
	const deleteBill = useMutation(api.bill.deleteBill)

	const handleDelete = async (id: Id<'bills'>) => {
		try {
			await deleteBill({ id })
			toast.success('Bill deleted')
		} catch (error) {
			console.error(error)
			toast.error('Error deleting bill')
		}
	}

	return (
		<div className='container space-y-4 py-12'>
			<h1 className='text-4xl'>Bill Tracker</h1>
			<CreateButton />
			{bills?.map((bill) => (
				<div
					key={bill._id}
					className='mt-4 flex items-center justify-between'>
					<div>
						<h2 className='text-xl'>{bill.name}</h2>
						<p className='text-gray-500'>{formatCurrency(bill.amount)}</p>
						<p className='text-gray-500'>Due Date: {bill.dueDate}</p>
					</div>
					<Button
						variant='outline'
						onClick={() => handleDelete(bill._id)}>
						Delete
					</Button>
				</div>
			))}
			<DataTable
				columns={columns}
				data={bills || []}
				filterKey='name'
				// options={['status', 'priority']}
			/>
		</div>
	)
}
