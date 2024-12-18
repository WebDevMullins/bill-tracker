'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSheet } from '@/hooks/use-sheet'

const formSchema = z.object({
	name: z.string().min(1)
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	defaultValues?: FormValues
}

export function NewCategoryForm({ defaultValues }: Props) {
	const { onClose } = useSheet()
	const createCategory = useMutation(api.categories.createCategory)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(value: FormValues) {
		try {
			await createCategory({
				name: value.name
			})
			toast.success(`${value.name} added successfully.`)
		} catch (error) {
			console.error(error)
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'
			toast.error(`Failed to add bill. ${errorMessage}`)
		}

		onClose()
		form.reset(defaultValues)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 pt-4'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Netflix'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full'>Create Category</Button>
			</form>
		</Form>
	)
}
