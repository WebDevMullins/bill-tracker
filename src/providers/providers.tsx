'use client'

import { ReactNode } from 'react'

import { ConvexClientProvider } from './convex-client'
import SheetProvider from './sheet-provider'
import { ThemeProvider } from './theme'

import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ConvexClientProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange>
				{children}
				<SheetProvider />
				<Toaster richColors />
			</ThemeProvider>
		</ConvexClientProvider>
	)
}
