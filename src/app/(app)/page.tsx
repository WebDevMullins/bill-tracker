'use client'

import { FormDialog } from '@/components/form-dialog'
import { Button } from '@/components/ui/button'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function Home() {
	const bills = useQuery(api.bill.getBills)
	return (
		<div className='container py-12'>
			<h1 className='text-4xl'>Bill Tracker</h1>
			<FormDialog />
			{bills?.map((bill) => (
				<div
					key={bill.id}
					className='mt-4 flex items-center justify-between'>
					<div>
						<h2 className='text-xl'>{bill.name}</h2>
						<p className='text-gray-500'>${bill.amount}</p>
					</div>
					<Button variant='outline'>Edit</Button>
				</div>
			))}
		</div>
	)
}
