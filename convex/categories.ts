import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

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

// Get all categories
export const getCategories = query({
	handler: async (ctx) => {
		const categories = await ctx.db
			.query('categories')
			.withIndex('by_name')
			.order('asc')
			.collect()
		return categories
	}
})

// Get category by ID
export const getCategoryById = query({
	args: {
		categoryId: v.id('categories')
	},
	handler: async (ctx, args) => {
		const category = await ctx.db.get(args.categoryId)
		return category
	}
})
