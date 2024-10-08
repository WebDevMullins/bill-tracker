import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	// bills table schema
	bills: defineTable({
		amount: v.float64(),
		dueDate: v.string(),
		name: v.string(),
		isPaid: v.boolean()
		// payeeId: v.id('payees') // foreign key to payees table
	}).index('by_dueDate', ['dueDate']),

	// payees table schema
	payees: defineTable({
		name: v.string(),
		website: v.string()
	}).index('by_name', ['name'])
})
