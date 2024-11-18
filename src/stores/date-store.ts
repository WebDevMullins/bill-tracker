// src/stores/counter-store.ts
import { startOfMonth } from 'date-fns'
import { createStore } from 'zustand/vanilla'

type DateRange = {
	from: Date
	to: Date
}

export type DateRangeState = {
	dateRange: DateRange
}

export type DateRangeActions = {
	updateDateRange: (range: DateRange) => void
}

export type DateRangeStore = DateRangeState & DateRangeActions

export const defaultInitState: DateRangeState = {
	dateRange: {
		// from: new Date(new Date().setHours(0, 0, 0, 0)),
		from: startOfMonth(new Date()),
		to: new Date(new Date().setHours(23, 59, 59, 999))
	}
}

export const createDateRangeStore = (
	initState: DateRangeState = defaultInitState
) => {
	return createStore<DateRangeStore>()((set) => ({
		...initState,
		updateDateRange: (range) =>
			set({ dateRange: range })
	}))
}
