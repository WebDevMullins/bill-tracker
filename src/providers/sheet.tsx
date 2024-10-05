'use client'

import { useMountedState } from 'react-use'

import { SheetForm } from '@/components/sheet-form'

export default function SheetProvider() {
	const isMounted = useMountedState()

	if (!isMounted) {
		return null
	}

	return (
		<>
			<SheetForm  />
		</>
	)
}