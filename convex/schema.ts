import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	// bills table schema
	bills: defineTable({
		amount: v.float64(),
		dueDate: v.string(),
		isPaid: v.boolean(),
		payeeId: v.id('payees'), // foreign key to payees table
		categoryId: v.id('categories') // foreign key to categories table
	}).index('by_dueDate', ['dueDate']),

	// categories table schema
	categories: defineTable({
		name: v.string()
	}).index('by_name', ['name']),

	// payees table schema
	payees: defineTable({
		name: v.string(),
		website: v.string()
	}).index('by_name', ['name'])
})
