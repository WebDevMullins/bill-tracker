'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { formatDate } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { api } from '../../../convex/_generated/api'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useSheet } from '@/hooks/use-sheet'
import { convertToMiliunits } from '@/lib/utils'

const formSchema = z.object({
	amount: z.string().min(1),
	dueDate: z.coerce.date(),
	name: z.string().min(1)
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	defaultValues?: FormValues
}

export function NewBillForm({ defaultValues }: Props) {
	const { onClose } = useSheet()
	const createBill = useMutation(api.bill.createBill)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(value: FormValues) {
		const amount = parseFloat(value.amount)
		const amountInMiliunits = convertToMiliunits(amount)

		// const formattedDate = value.dueDate.toISOString().split('T')[0]
		const formattedDate = formatDate(value.dueDate, 'MM/dd/yyyy')

		try {
			await createBill({
				amount: amountInMiliunits,
				dueDate: formattedDate,
				name: value.name
			})
			console.log(value)
			toast.success(`${value.name} - $${value.amount} added successfully.`)
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
					name='dueDate'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Due Date</FormLabel>
							<DatePicker
								value={field.value}
								onChange={field.onChange}
								// disabled={isPending}
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
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
							{/* <FormDescription>
												Enter the name of the bill.
											</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}></FormField>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input
									placeholder='$0.00'
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>Enter bill amount.</FormDescription> */}
							<FormMessage />
						</FormItem>
					)}></FormField>
				<Button className='w-full'>Create Bill</Button>
			</form>
		</Form>
	)
}
