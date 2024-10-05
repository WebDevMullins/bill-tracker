import { create } from 'zustand'

type UseSheetProps = {
	isOpen: boolean
	onClose: () => void
	onOpen: () => void
}

export const useSheet = create<UseSheetProps>((set) => ({
	isOpen: false,
	onClose: () => set({ isOpen: false }),
	onOpen: () => set({ isOpen: true })
}))
