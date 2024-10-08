'use client'

import { useMountedState } from 'react-use'

import { NewBillSheet } from '@/components/sheets/new-bill-sheet'
import { NewPayeeSheet } from '@/components/sheets/new-payee-sheet'

import { useSheet } from '@/hooks/use-sheet'

export default function SheetProvider() {
	const isMounted = useMountedState()
	const { sheetType } = useSheet()

	if (!isMounted) {
		return null
	}

	return (
		<>
			{sheetType === 'bill' && <NewBillSheet />}
			{sheetType === 'payee' && <NewPayeeSheet />}
		</>
	)
}
