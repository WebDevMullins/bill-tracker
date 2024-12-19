'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { formatDate } from 'date-fns'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { useSheet } from '@/hooks/use-sheet'
import { convertToMiliunits } from '@/lib/utils'
import { createBill } from '@/server/db/bills'
import { getCategories } from '@/server/db/categories'
import { getPayees } from '@/server/db/payees'

const formSchema = z.object({
	amount: z.string().min(1),
	dueDate: z.coerce.date(),
	isPaid: z.optional(z.boolean()),
	categoryId: z.string(),
	payeeId: z.string()
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	defaultValues?: FormValues
	onSubmit: (values: FormValues) => void
}

// function NewBill() {
// 	const { mutate } = useMutation({
// 		mutationFn: (values: FormValues) => {
// 			const amount = parseFloat(values.amount)
// 			const amountInMiliunits = convertToMiliunits(amount)
// 			const formattedDate = formatDate(values.dueDate, 'MM/dd/yyyy')
// 			return createBill(
// 				amountInMiliunits,
// 				parseInt(values.categoryId),
// 				categories?.find(
// 					(category) => category.id.toString() === values.categoryId
// 				)?.name || '',
// 				formattedDate,
// 				values.isPaid ? 1 : 0,
// 				payees?.find((payee) => payee.id.toString() === values.payeeId)?.name ||
// 					'',
// 				parseInt(values.payeeId)
// 			)
// 		}
// 	})
// 	const { data: payees } = useQuery({
// 		queryKey: ['payees'],
// 		queryFn: getPayees
// 	})

// 	const { data: categories } = useQuery({
// 		queryKey: ['categories'],
// 		queryFn: getCategories
// 	})
// }

export function NewBillForm({ defaultValues, onSubmit }: Props) {
	const { onClose } = useSheet()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	// async function onSubmit(value: FormValues) {
	// 	const amount = parseFloat(value.amount)
	// 	const amountInMiliunits = convertToMiliunits(amount)
	// 	const formattedDate = formatDate(value.dueDate, 'MM/dd/yyyy')

	// 	try {
	// 		await createBill(
	// 			amountInMiliunits,
	// 			parseInt(value.categoryId),
	// 			categories?.find(
	// 				(category) => category.id.toString() === value.categoryId
	// 			)?.name || '',
	// 			formattedDate,
	// 			value.isPaid ? 1 : 0,
	// 			payees?.find((payee) => payee.id.toString() === value.payeeId)?.name ||
	// 				'',
	// 			parseInt(value.payeeId)
	// 		)
	// 		toast.success(`Bill added successfully.`)
	// 	} catch (error) {
	// 		console.error(error)
	// 		const errorMessage =
	// 			error instanceof Error ? error.message : 'Unknown error'
	// 		toast.error(`Failed to add bill. ${errorMessage}`)
	// 	}

	// 	onClose()
	// 	form.reset(defaultValues)
	// }

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
					name='payeeId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payee</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a payee' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{payees?.map((payee) => (
										<SelectItem
											key={payee.id}
											value={payee.id.toString()}
											className='capitalize'>
											{payee.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='categoryId'
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a category' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{categories?.map((category) => (
										<SelectItem
											key={category.id}
											value={category.id.toString()}
											className='capitalize'>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
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
					)}
				/>
				<FormField
					control={form.control}
					name='isPaid'
					render={({ field }) => (
						<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<div className='space-y-1 leading-none'>
								<FormLabel>Paid</FormLabel>
							</div>
						</FormItem>
					)}
				/>
				<Button className='w-full'>Create Bill</Button>
			</form>
		</Form>
	)
}
