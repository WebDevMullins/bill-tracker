import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useSheet } from '@/hooks/use-sheet'

type SheetProps = {
	description: string
	form: React.ReactNode
	title: string
}

export function SheetForm({ description, form, title }: SheetProps) {
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
