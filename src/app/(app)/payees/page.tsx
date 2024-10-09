'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

import CreateButton from '@/components/create-button'
import { DataTable } from '@/components/data-table/data-table'
import { columns } from '@/components/payees/columns'

export default function PayeesPage() {
	const payees = useQuery(api.payees.getPayees)

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Payees</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your payees
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateButton sheetType='payee' />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={payees || []}
						filterKey='name'
						// options={['status', 'priority']}
					/>
				</div>
			</div>
		</div>
	)
}
