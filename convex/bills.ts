import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

// Create a new bill
export const createBill = mutation({
	args: {
		amount: v.number(),
		categoryId: v.id('categories'),
		dueDate: v.string(),
		isPaid: v.optional(v.boolean()),
		payeeId: v.id('payees')
	},
	handler: async (ctx, args) => {
		const newBill = await ctx.db.insert('bills', {
			amount: args.amount,
			categoryId: args.categoryId,
			dueDate: args.dueDate,
			isPaid: args.isPaid ?? false,
			payeeId: args.payeeId
		})
		return newBill
	}
})

// Get all bills
export const getBills = query({
	args: { from: v.string(), to: v.string() },
	handler: async (ctx, args) => {
		if (args.from && args.to) {
			const bills = await ctx.db
				.query('bills')
				.withIndex('by_dueDate')
				.filter((q) =>
					q.and(
						q.gte(q.field('dueDate'), args.from),
						q.lte(q.field('dueDate'), args.to)
					)
				)
				.collect()

			console.log('from: ', args.from, 'to: ', args.to)

			// bills = await ctx.db
			// 	.query('bills')
			// 	.withIndex('by_dueDate')
			// 	.order('asc')
			// 	.collect()

			// Fetch payee and category names for each bill
			const billsWithCategoryiesAndPayees = await Promise.all(
				bills.map(async (bill) => {
					const payee = await ctx.db.get(bill.payeeId)
					const category = await ctx.db.get(bill.categoryId)

					return {
						...bill,
						categoryName: category ? category.name : 'Unknown Category',
						payeeName: payee ? payee.name : 'Unknown Payee'
					}
				})
			)

			return billsWithCategoryiesAndPayees
		}
	}
})

// Delete a bill
export const deleteBill = mutation({
	args: {
		id: v.id('bills')
	},
	handler: async (ctx, args) => {
		return await ctx.db.delete(args.id)
	}
})

// Pay a bill
export const payBill = mutation({
	args: {
		id: v.id('bills')
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, { isPaid: true })
	}
})

// Unpay a bill
export const unpayBill = mutation({
	args: {
		id: v.id('bills')
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, { isPaid: false })
	}
})

// Get bills by payee ID
export const getBillsByPayeeId = query({
	args: {
		payeeId: v.id('payees')
	},
	handler: async (ctx, args) => {
		const bills = await ctx.db
			.query('bills')
			.withIndex('by_dueDate')
			.filter((q) => q.eq(q.field('payeeId'), args.payeeId))
			.collect()

		// Fetch payee and category names for each bill
		const billsWithPayees = await Promise.all(
			bills.map(async (bill) => {
				const payee = await ctx.db.get(bill.payeeId)
				const category = await ctx.db.get(bill.categoryId)

				return {
					...bill,
					categoryName: category ? category.name : 'Unknown Category',
					payeeName: payee ? payee.name : 'Unknown Payee'
				}
			})
		)

		return billsWithPayees
	}
})

// Get bills by payee ID, only return dueDate and amount
export const getBillsByPayeeIdForChart = query({
	args: {
		payeeId: v.id('payees')
	},
	handler: async (ctx, args) => {
		const bills = await ctx.db
			.query('bills')
			.withIndex('by_dueDate')
			.filter((q) => q.eq(q.field('payeeId'), args.payeeId))
			.collect()

		return bills.map((bill) => ({
			dueDate: bill.dueDate,
			amount: bill.amount
		}))
	}
})
