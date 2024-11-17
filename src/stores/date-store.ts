// src/stores/counter-store.ts
import { startOfMonth } from 'date-fns'
import { createStore } from 'zustand/vanilla'

export type DateRangeState = {
	dateRange: { from: Date; to: Date }
}

export type DateRangeActions = {
	updateDateRange: (range: { from: Date; to: Date }) => void
}

export type DateRangeStore = DateRangeState & DateRangeActions

export const defaultInitState: DateRangeState = {
	dateRange: {
		from: startOfMonth(new Date()),
		to: new Date(new Date().setHours(23, 59, 59, 999))
	}
}

export const createDateRangeStore = (
	initState: DateRangeState = defaultInitState
) => {
	return createStore<DateRangeStore>()((set) => ({
		...initState,
		updateDateRange: (range) => set({ dateRange: range })
	}))
}
