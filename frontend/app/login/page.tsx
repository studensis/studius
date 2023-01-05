'use client';

import LoginForm from './LoginForm';

export default function Login() {
	return (
		<div className="flex flex-col md:flex-row w-full md:h-screen">
			<div className="flex flex-col md:justify-center flex-1 bg-background h-full md:overflow-y-hidden md:p-20 p-6">
				<h1 className="display3">
					Welcome to{' '}
					<span className="display2 text-accent">Studius</span>
				</h1>
			</div>
			<div className="flex flex-col md:justify-center flex-1 bg-section h-full md:overflow-y-hidden md:p-20 p-6">
				<h1 className="title1 mb-4"> Log in </h1>
				<LoginForm />
			</div>
		</div>
	);
}
