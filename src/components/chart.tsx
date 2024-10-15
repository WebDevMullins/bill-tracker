'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {
	amount: {
		label: 'Amount',
		color: 'hsl(var(--chart-2))'
	}
} satisfies ChartConfig

type ChartProps = {
	month: string
	amount: number | string
}[]

export function Chart({ data }: { data: ChartProps }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Area Chart</CardTitle>
				<CardDescription>
					Showing total visitors for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 18,
							right: 18,
							top: 12
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey='month'
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									className='currency'
									indicator='line'
								/>
							}
						/>
						<Area
							dataKey='amount'
							type='natural'
							fill='var(--color-amount)'
							fillOpacity={0.4}
							stroke='var(--color-amount)'
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
