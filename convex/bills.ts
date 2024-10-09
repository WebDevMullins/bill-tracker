import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create a new bill
export const createBill = mutation({
	args: {
		amount: v.number(),
		dueDate: v.string(),
		isPaid: v.optional(v.boolean()),
		payeeId: v.id('payees')
	},
	handler: async (ctx, args) => {
		const newBill = await ctx.db.insert('bills', {
			amount: args.amount,
			dueDate: args.dueDate,
			isPaid: args.isPaid ?? false,
			payeeId: args.payeeId
		})
		return newBill
	}
})

// Get all bills
export const getBills = query({
	handler: async (ctx) => {
		const bills = await ctx.db
			.query('bills')
			.withIndex('by_dueDate')
			.order('asc')
			.collect()

		// Fetch payee names for each bill
		const billsWithPayees = await Promise.all(
			bills.map(async (bill) => {
				const payee = await ctx.db.get(bill.payeeId)
				return {
					...bill,
					payeeName: payee!.name
				}
			})
		)

		return billsWithPayees
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
