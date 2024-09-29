'use client'

import { ReactNode } from 'react'
import { ConvexClientProvider } from './convex-client'
import { ThemeProvider } from './theme'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ConvexClientProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange>
				{children}
			</ThemeProvider>
		</ConvexClientProvider>
	)
}
