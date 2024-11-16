'use client'

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState
} from '@tanstack/react-table'
import { CrossIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

// import { DateRangePicker } from '../date-range-picker'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './data-table-view-options'

// import { DataTableToolbar } from './data-table-toolbar'

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	filterKey: string
	showDateRangePicker?: boolean
	updateDateRange?: (values: { range: { from: Date; to: Date } }) => void
	// options: string[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
	filterKey,
	// showDateRangePicker = true,
	// updateDateRange
	// options
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = useState({})
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters
		},
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	})
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='min-w-[800px] space-y-4'>
			{/* Toolbar */}
			{/* <DataTableToolbar
				table={table}
				filterKey={filterKey}
				showDateRangePicker={showDateRangePicker}
				// options={options}
			/> */}
			<div className='flex items-center justify-between'>
				<div className='flex flex-1 items-center space-x-2'>
					<Input
						id='filter'
						placeholder={`Filter ${filterKey}...`}
						value={
							(table.getColumn(filterKey)?.getFilterValue() as string) ?? ''
						}
						onChange={(event) =>
							table.getColumn(filterKey)?.setFilterValue(event.target.value)
						}
						className='h-8 w-[150px] lg:w-[250px]'
					/>
					{/* {table.getColumn('status') && (
					<DataTableFacetedFilter
						column={table.getColumn(options[0]!)}
						title='Status'
						options={options}
					/>
				)}
				{table.getColumn('priority') && (
					<DataTableFacetedFilter
						column={table.getColumn('priority')}
						title='Priority'
						options={priorities}
					/>
				)} */}

					{isFiltered && (
						<Button
							variant='ghost'
							onClick={() => table.resetColumnFilters()}
							className='h-8 px-2 lg:px-3'>
							Reset
							<CrossIcon className='ml-2 h-4 w-4' />
						</Button>
					)}
				</div>
				<div className='flex items-center space-x-2'>
					{table.getFilteredSelectedRowModel().rows.length > 0 && (
						<Button
							size='sm'
							variant='destructive'
							className='h-8 px-2 lg:px-3'>
							<Trash2Icon className='mr-2 size-4' />
							Delete {table.getFilteredSelectedRowModel().rows.length} items
						</Button>
					)}
					{/* {showDateRangePicker && (
						<DateRangePicker onUpdate={updateDateRange} />
					)} */}
					<DataTableViewOptions table={table} />
				</div>
			</div>
			{/* Table */}
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No items found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
