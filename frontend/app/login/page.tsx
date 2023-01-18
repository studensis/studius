'use client';

import Image from 'next/image';
import LoginForm from './LoginForm';

export default function Login() {
	return (
		<div className="flex flex-col md:flex-row w-full md:h-screen">
			<div className="flex flex-col md:justify-center flex-1 bg-background h-full md:overflow-y-hidden md:p-20 p-6">
				<h1 className="display3">
					<span className="flex flex-row md:flex-col md:items-start items-center gap-2">
						<div className="relative w-12 h-12 rounded-[16px] bg-neutral-medium inline-block md:block md:mb-6">
							<Image
								src={'/favicon.png'}
								fill
								style={{ objectFit: 'contain' }}
								alt=""
							/>
						</div>
						<span>
							Welcome to{' '}
							<span className="display2 inline-block md:block text-accent">
								Studius
							</span>
						</span>
					</span>
				</h1>
			</div>
			<div className="flex-1 h-full md:overflow-y-hidden md:p-4 p-0">
				<div className="flex flex-col md:justify-center flex-1 bg-section md:p-20 md:py-20 py-10 p-6 md:h-full rounded-2xl md:overflow-hidden">
					<h1 className="title1 mb-4"> Log in </h1>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
