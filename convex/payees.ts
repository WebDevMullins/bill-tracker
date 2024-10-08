import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// Create a new payee
export const createPayee = mutation({
	args: {
		name: v.string(),
		website: v.string()
	},
	handler: async (ctx, args) => {
		const newPayee = await ctx.db.insert('payees', {
			name: args.name,
			website: args.website
		})
		return newPayee
	}
})

// Get all payees
export const getPayees = query({
	handler: async (ctx) => {
		const payees = await ctx.db
			.query('payees')
			.withIndex('by_name')
			.order('asc')
			.collect()
		return payees
	}
})
