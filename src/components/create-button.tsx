'use client'

import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

// import { useNewBill } from './hooks/use-new-bill'
import { useSheet } from '@/hooks/use-sheet'

export default function CreateButton() {
	const { onOpen } = useSheet()

	return (
		<Button
			variant={'outline'}
			onClick={onOpen}>
			<PlusCircleIcon className='mr-2 size-4' />
			New
		</Button>
	)
}
