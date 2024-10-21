import { internalMutation } from './_generated/server'

const categories = [
	'Mortgage',
	'Groceries',
	'Utilities',
	'Insurance',
	'Entertainment',
	'Internet',
	'Phone',
	'Clothing',
	'Other'
]

// Seed catogories
export const seedCategories = internalMutation(async (ctx) => {
	const newCategories = await Promise.all(
		categories.map(async (categoryName) => {
			return await ctx.db.insert('categories', { name: categoryName })
		})
	)
	return newCategories
})

const payees = [
	{
		name: 'Freedom Mortgage',
		website: 'https://www.mylogin.freedommortgage.com'
	},
	{
		name: 'AT&T',
		website: 'https://www.att.com'
	},
	{
		name: 'Reliant Energy',
		website: 'https://www.reliant.com/protected/myAccount.htm'
	},
	{
		name: 'Netflix',
		website: 'https://www.netflix.com'
	}
]

// Seed payees
export const seedPayees = internalMutation(async (ctx) => {
	const newPayees = await Promise.all(
		payees.map(async (payee) => {
			return await ctx.db.insert('payees', payee)
		})
	)
	return newPayees
})
