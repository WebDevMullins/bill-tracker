import { FormDialog } from '@/components/form-dialog'

export default function Home() {
	return (
		<div className='container py-12'>
			<h1 className='text-4xl'>Bill Tracker</h1>
			<FormDialog />
		</div>
	)
}
