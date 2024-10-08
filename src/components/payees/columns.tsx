'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { Payee } from '@/lib/types'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-headers'
// import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import Link from 'next/link'
import { TableRowActions } from './table-row-actions'

export const columns: ColumnDef<Payee>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Name'
			/>
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('name')}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'website',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				title='Website'
			/>
		),
		cell: ({ row }) => {
			const website = row.getValue('website') as string
			const formattedWebsite =
				website.startsWith('http://') || website.startsWith('https://')
					? website
					: `https://${website}`
			return (
				<div className='flex space-x-2'>
					<Link
						href={formattedWebsite}
						target='_blank'
						rel='noopener noreferrer'>
						<div className='max-w-[500px] truncate font-medium'>
							{row.getValue('website')}
						</div>
					</Link>
				</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => <TableRowActions row={row} />
	}
]
