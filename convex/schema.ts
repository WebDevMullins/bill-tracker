import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	// Other tables here...

	bills: defineTable({
		amount: v.float64(),
		dueDate: v.string(),
		name: v.string(),
		isPaid: v.boolean()
	}).index('by_dueDate', ['dueDate'])
})
