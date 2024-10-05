import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'

import { useSheet } from '@/hooks/use-sheet'

type SheetProps = {
	form: React.ReactNode
	title: string
	description: string
}

export function SheetForm({ form, title, description }: SheetProps) {
	const { isOpen, onClose } = useSheet()

	return (
		<Sheet
			open={isOpen}
			onOpenChange={onClose}>
			<SheetContent className='space-y-4'>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>{description}</SheetDescription>
				</SheetHeader>
				{form}
			</SheetContent>
		</Sheet>
	)
}
