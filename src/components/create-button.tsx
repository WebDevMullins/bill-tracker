'use client'

import { PlusCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useSheet } from '@/hooks/use-sheet'

type CreateButtonProps = {
	sheetType: 'bill' | 'payee'
}

export default function CreateButton({ sheetType }: CreateButtonProps) {
	const { onOpen } = useSheet()

	const handleClick = () => {
		if (sheetType === 'bill') {
			// Open the bill sheet
			onOpen('bill')
		} else if (sheetType === 'payee') {
			// Open the payee sheet
			onOpen('payee')
		}
	}

	return (
		<Button
			variant={'outline'}
			onClick={handleClick}
			className='capitalize'>
			<PlusCircleIcon className='mr-2 size-4' />
			New {sheetType}
		</Button>
	)
}
