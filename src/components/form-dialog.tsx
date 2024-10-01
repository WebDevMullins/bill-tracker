'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { api } from '../../convex/_generated/api'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { convertToMiliunits } from '@/lib/utils'
import { DatePicker } from './date-picker'
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'

const formSchema = z.object({
	amount: z.string().min(1),
	dueDate: z.coerce.date(),
	// dueDate: z.string().min(1),
	name: z.string().min(1)
})

type FormValues = z.infer<typeof formSchema>

type Props = {
	defaultValues?: FormValues
}

export function FormDialog({ defaultValues }: Props) {
	const [open, setOpen] = useState(false)
	const createBill = useMutation(api.bill.createBill)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	async function onSubmit(value: FormValues) {
		const amount = parseFloat(value.amount)
		const amountInMiliunits = convertToMiliunits(amount)

		const formattedDate = value.dueDate.toISOString().split('T')[0]

		try {
			await createBill({
				amount: amountInMiliunits,
				dueDate: formattedDate,
				name: value.name
			})
			toast.success(`${value.name} - $${value.amount} added successfully.`)
			form.reset()
			setOpen(false)
		} catch (error) {
			console.error(error)
			const errorMessage =
				error instanceof Error ? error.message : 'Unknown error'
			toast.error(`Failed to add bill. ${errorMessage}`)
			setOpen(false)
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				if (!open) {
					setOpen(true)
				} else {
					setOpen(false)
				}
			}}>
			<DialogTrigger asChild>
				<Button variant='outline'>Add Bill</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Add Bill</DialogTitle>
					<DialogDescription>Enter the details of the bill</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
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
										<FormItem className='col-span-3'>
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
										<FormItem className='col-span-3'>
											<FormLabel>Amount</FormLabel>
											<FormControl>
												<Input
													placeholder='$100.00'
													{...field}
												/>
											</FormControl>
											{/* <FormDescription>Enter bill amount.</FormDescription> */}
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
						</div>
						<DialogFooter>
							<Button type='submit'>Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
