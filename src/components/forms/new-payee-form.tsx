'use client'

import { api } from '@/../convex/_generated/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
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
	name: z.string().min(1),
	website: z.string().min(1)
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	defaultValues?: FormValues
}

export function NewPayeeForm({ defaultValues }: Props) {
	const { onClose } = useSheet()
	const createPayee = useMutation(api.payees.createPayee)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(value: FormValues) {
		try {
			await createPayee({
				name: value.name,
				website: value.website
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
				<FormField
					control={form.control}
					name='website'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Website</FormLabel>
							<FormControl>
								<Input
									placeholder='www.netflix.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-full'>Create Payee</Button>
			</form>
		</Form>
	)
}