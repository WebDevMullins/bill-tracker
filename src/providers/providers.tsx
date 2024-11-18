'use client'

import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { ConvexQueryClientProvider } from './convex-query-client-provider'
import { DateRangeStoreProvider } from './date-store-provider'
import SheetProvider from './sheet-provider'
import { ThemeProvider } from './theme'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ConvexQueryClientProvider>
			<DateRangeStoreProvider>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange>
					{children}
					<SheetProvider />
					<Toaster richColors />
				</ThemeProvider>
			</DateRangeStoreProvider>
		</ConvexQueryClientProvider>
	)
}
