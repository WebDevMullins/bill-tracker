'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

import { columns } from '@/components/bills/columns'
import CreateButton from '@/components/create-button'
import { DataTable } from '@/components/data-table/data-table'

export default function BillsPage() {
	const bills = useQuery(api.bills.getBills)

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Bills</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your bills
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateButton sheetType='bill' />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={bills || []}
						filterKey='payeeName'
						// options={['status', 'priority']}
					/>
				</div>
			</div>
		</div>
	)
}
