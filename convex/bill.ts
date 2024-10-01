import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create a new bill
export const createBill = mutation({
	args: {
		amount: v.number(),
		dueDate: v.string(),
		name: v.string()
	},
	handler: async (ctx, args) => {
		const newBill = await ctx.db.insert('bills', {
			amount: args.amount,
			dueDate: args.dueDate,
			name: args.name
		})
		return newBill
	}
})

export const getBills = query({
	handler: async (ctx) => {
		const bills = await ctx.db.query('bills').collect()
		return bills
	}
})
