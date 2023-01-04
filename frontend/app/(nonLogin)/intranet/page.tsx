'use client';

import useLogin from '../../../components/hooks/LoginContext';
import SubjectList from './SubjectList';

export default function Intranet() {
	const { user } = useLogin();
	return (
		<>
			<div>
				<h1 className="display3">Welcome back!</h1>
				<h2 className="title1">Me:</h2>
				<p>{JSON.stringify(user)}</p>
				<h2 className="title1">My Subjects:</h2>
				<SubjectList />
			</div>
		</>
	);
}
