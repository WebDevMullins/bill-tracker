'use client'

import { useState } from 'react'

import { columns } from '@/components/bills/columns'
import CreateButton from '@/components/create-button'
import { DataTable } from '@/components/data-table/data-table'

import { api } from '../../../../convex/_generated/api'

export default function BillsPage() {
	const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
		from: new Date(new Date().setHours(0, 0, 0, 0)),
		to: new Date(new Date().setHours(23, 59, 59, 999))
	})

	console.log('query dateRange', dateRange)

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
						filterKey='payeeName'
						queryFunction={api.bills.getBills}
						showDateRangePicker={true}
						updateDateRange={({ range }) => setDateRange(range)}
					/>
				</div>
			</div>
		</div>
	)
}
