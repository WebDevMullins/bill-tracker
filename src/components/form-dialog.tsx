'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'

const formSchema = z.object({
	name: z.string().min(1),
	amount: z.number().positive().min(1)
})

export function FormDialog() {
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			amount: 1
		}
	})

	function onSubmit(data: z.infer<typeof formSchema>) {
		console.log(data)
		toast.success('Bill added successfully.')
		form.reset()
		setOpen(false)
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
					<DialogDescription>Enter the details of the bill.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='grid gap-4 py-4'>
							<div className='grid grid-cols-4 items-center gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem className='col-span-3'>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder='Costco'
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Enter the name of the bill.
											</FormDescription>
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
													// placeholder='100'
													{...field}
												/>
											</FormControl>
											<FormDescription>Enter bill amount.</FormDescription>
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
