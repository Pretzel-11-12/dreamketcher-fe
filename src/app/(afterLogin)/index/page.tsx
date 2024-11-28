// "use client";
import Button from '@/app/_component/Button';
import Link from 'next/link';

export default function Page() {
	return (
		<div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
			<Link href={'/'}>
				<Button size='S' variant='bg-blue'>
					<div className='text-xs'>Home</div>
				</Button>
			</Link>

			<Button size='S' variant='bg-blue' disabled>
				<div className='text-sm'>Button</div>
			</Button>

			<Button size='S' variant='bg-gray' containerStyles={'rounded-none py-3 px-5'}>
				<div className='text-sm'>Custom Button</div>
			</Button>

			<Button size='S' variant='bg-transparent'>
				Ghost Button
			</Button>

			<Button size='S' variant='bg-blue'>
				<div className='flex gap-2'>
					<span className='mdi mdi-home text-white text-sm'></span>
					Home
				</div>
			</Button>

			<Button size='S' variant='bg-blue'>
				<i className='mdi mdi-chevron-right text-white'></i>
			</Button>
		</div>
	);
}
