export default function HomePage() {
	return (
		<div className='container py-12'>
			<div className='overflow-hidden rounded-[0.5rem] border bg-background shadow'>
				<div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
					<div className='flex items-center justify-between space-y-2'>
						<div>
							<h2 className='text-2xl font-bold tracking-tight'>Home</h2>
							<p className='text-muted-foreground'>
								Here&apos;s a list of your bills
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
