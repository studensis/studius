import useLogin from '../../../components/hooks/LoginContext';
// import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const { user } = useLogin();
	// const subjectList = trpc.user.getUserById.useQuery(user ? user.userId : '');
	return <>Hello</>;
}
