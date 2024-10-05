'use client'

import { useMountedState } from 'react-use'

import { NewBillSheet } from '@/components/sheets/new-bill-sheet'

export default function SheetProvider() {
	const isMounted = useMountedState()

	if (!isMounted) {
		return null
	}

	return (
		<>
			<NewBillSheet />
		</>
	)
}
