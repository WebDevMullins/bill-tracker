'use client'

import { createContext, type ReactNode, useContext, useRef } from 'react'
import { useStore } from 'zustand'

import { createDateRangeStore, type DateRangeStore } from '@/stores/date-store'

export type DateRangeStoreApi = ReturnType<typeof createDateRangeStore>

export const DateRangeStoreContext = createContext<
	DateRangeStoreApi | undefined
>(undefined)

export interface DateRangeStoreProviderProps {
	children: ReactNode
}

export const DateRangeStoreProvider = ({
	children
}: DateRangeStoreProviderProps) => {
	const storeRef = useRef<DateRangeStoreApi>()
	if (!storeRef.current) {
		storeRef.current = createDateRangeStore()
	}

	return (
		<DateRangeStoreContext.Provider value={storeRef.current}>
			{children}
		</DateRangeStoreContext.Provider>
	)
}

export const useDateRangeStore = <T,>(
	selector: (store: DateRangeStore) => T
): T => {
	const dateStoreContext = useContext(DateRangeStoreContext)

	if (!dateStoreContext) {
		throw new Error(
			`useDateRangeStore must be used within DateRangeStoreProvider`
		)
	}

	return useStore(dateStoreContext, selector)
}
