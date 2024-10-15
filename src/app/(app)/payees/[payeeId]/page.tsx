'use client'

import { api } from '@/../convex/_generated/api'
import { Id } from '@/../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { columns } from '@/components/bills/columns'
import { Chart } from '@/components/chart'
import CreateButton from '@/components/create-button'
import { DataTable } from '@/components/data-table/data-table'

import { convertDateToMonth, convertFromMiliunits } from '@/lib/utils'

export default function PayeePage() {
	const params = useParams()
	const payeeId = params?.payeeId as Id<'payees'>

	const payee = useQuery(api.payees.getPayeeById, { payeeId })
	const billsByPayee = useQuery(api.bills.getBillsByPayeeId, { payeeId })
	const chartData = billsByPayee?.map((bill) => ({
		month: convertDateToMonth(bill.dueDate),
		amount: convertFromMiliunits(bill.amount)
	}))

	const website = payee?.website as string
	const formattedWebsite =
		website?.startsWith('http://') || website?.startsWith('https://')
			? website
			: `https://${website}`

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>
								{payee?.name}
							</h2>
							<p className='text-muted-foreground'>
								<Link
									href={formattedWebsite || '#'}
									target='_blank'>
									Go to website
								</Link>
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateButton sheetType='payee' />
							<CreateButton sheetType='bill' />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={billsByPayee || []}
						filterKey='name'
					/>
					<Chart data={chartData || []} />
				</div>
			</div>
		</div>
	)
}
