'use client';
import useLogin from '../../../components/hooks/LoginContext';
import SeminarPage from './SeminarPage';

const seminars = () => {
	const { user } = useLogin();

	return (
		<>
			<div>{user?.userId && <SeminarPage userId={user.userId} />}</div>
		</>
	);
};

export default seminars;
