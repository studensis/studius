import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import SubjectCard from '../../../components/Cards/SubjectCard';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const { user } = useLogin();
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(user!.userId);
	return (
		<>
			<Stack cols={2}>
				{enrolledSubjects.isLoading && <Spinner />}
				{enrolledSubjects.data &&
					enrolledSubjects.data.map((enrolledSubject) => (
						<SubjectCard
							subject={enrolledSubject.subject}
							role={enrolledSubject.roleTitle}
						/>
					))}
			</Stack>
		</>
	);
}
