'use client'

import { useQuery } from 'convex/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { api } from '@/../convex/_generated/api'
import { Id } from '@/../convex/_generated/dataModel'
import { columns } from '@/components/categories/columns'
import { Chart } from '@/components/chart'
import CreateButton from '@/components/create-button'
import { DataTable } from '@/components/data-table/data-table'
import { formatCurrency } from '@/lib/utils'

export default function CategoryPage() {
	const params = useParams()
	const categoryId = params?.categoryId as Id<'categories'>

	const category = useQuery(api.categories.getCategoryById, { categoryId })
	const total = useQuery(api.categories.getCategoryTotal, { categoryId })
	const totalSpent = formatCurrency(total!)

	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>
								{category?.name}
							</h2>
							<p className='text-muted-foreground'>
								<Link
									href={'#'}
									target='_blank'>
									Go to website {totalSpent!}
								</Link>
							</p>
						</div>
						<div className='flex items-center space-x-2'>
							<CreateButton sheetType='category' />
							<CreateButton sheetType='bill' />
						</div>
					</div>
					<DataTable
						columns={columns}
						data={category ? [category] : []}
						filterKey='name'
					/>
					<Chart data={total} />
				</div>
			</div>
		</div>
	)
}
