'use client';
import useLogin from '../../../components/hooks/LoginContext';
import Seminar from './Seminar';

const seminars = () => {
	const { user } = useLogin();

	return <div>{user?.userId && <Seminar userId={user.userId} />}</div>;
};

export default seminars;
