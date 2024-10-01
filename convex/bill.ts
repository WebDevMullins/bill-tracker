import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create a new bill
export const createBill = mutation({
	args: { name: v.string(), amount: v.string() },
	handler: async (ctx, args) => {
		const newBill = await ctx.db.insert('bills', {
			name: args.name,
			amount: args.amount
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
