import { v } from 'convex/values'
import { mutation } from './_generated/server'

// Create a new category
export const createCategory = mutation({
	args: {
		name: v.string()
	},
	handler: async (ctx, args) => {
		const newCategory = await ctx.db.insert('categories', {
			name: args.name
		})
		return newCategory
	}
})
