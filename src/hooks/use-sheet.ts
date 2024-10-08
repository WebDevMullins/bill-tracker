import { create } from 'zustand'

type UseSheetProps = {
	isOpen: boolean
	sheetType: 'bill' | 'payee' | null
	onClose: () => void
	onOpen: (type: 'bill' | 'payee') => void
}

export const useSheet = create<UseSheetProps>((set) => ({
	isOpen: false,
	sheetType: null,
	onClose: () => set({ isOpen: false, sheetType: null }),
	onOpen: (type) => set({ isOpen: true, sheetType: type })
}))
