import { v } from 'convex/values'

import { mutation, query } from './_generated/server'

import { formatCurrency } from '../src/lib/utils'

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

// Get total amount spent in a category
export const getCategoryTotal = query({
	args: {
		categoryId: v.id('categories')
	},
	handler: async (ctx, args) => {
		const bills = await ctx.db
			.query('bills')
			.filter((q) => q.eq(q.field('categoryId'), args.categoryId))
			.collect()
		const total = bills.reduce((acc, bill) => acc + bill.amount, 0)
		// const formattedTotal = formatCurrency(total)
		return total
	}
})
