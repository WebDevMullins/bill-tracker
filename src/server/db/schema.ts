// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, integer, pgTableCreator, varchar } from 'drizzle-orm/pg-core'

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `finance-tracker_${name}`)

export const bills = createTable(
	'bill',
	{
		id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
		amount: integer('amount'),
		categoryId: integer('category_id').references(() => categories.id),
		categoryName: varchar('category_name').references(() => categories.name),
		dueDate: varchar('due_date', { length: 256 }),
		isPaid: integer('is_paid'),
		payeeName: varchar('payee_name').references(() => payees.name),
		payeeId: integer('payee_id').references(() => payees.id)
	},
	(example) => [index('name_idx').on(example.id)]
)

export const categories = createTable(
	'category',
	{
		id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
		name: varchar('name', { length: 256 })
	},
	(example) => [index('name_idx').on(example.id)]
)

export const payees = createTable(
	'payee',
	{
		id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
		name: varchar('name', { length: 256 }),
		website: varchar('website', { length: 256 })
	},
	(example) => [index('name_idx').on(example.id)]
)
