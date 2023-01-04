'use client';

import LoginForm from './LoginForm';

export default function Login() {
	return (
		<div>
			<h1 className="display3"> login page </h1>
			<p>You are logged out. Please log in.</p>
			<LoginForm />
		</div>
	);
}
