'use client'

import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'

import { ConvexClientProvider } from './convex-client'
import { DateRangeStoreProvider } from './date-store-provider'
import SheetProvider from './sheet-provider'
import { ThemeProvider } from './theme'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ConvexClientProvider>
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
		</ConvexClientProvider>
	)
}
