import { Stack } from '../../../components/@studius/PageElements/Stack';
import SubjectCard from '../../../components/Cards/SubjectCard';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';
import LoadingSubjects from './loadingSubjects';

export default function SubjectList() {
	const { user } = useLogin();
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery({
		userId: user!.userId,
	});
	return (
		<Stack cols={2}>
			{enrolledSubjects.isLoading && <LoadingSubjects />}
			{enrolledSubjects.data &&
				enrolledSubjects.data.map((enrolledSubject) => (
					<SubjectCard
						key={enrolledSubject.id}
						subject={enrolledSubject.subject}
						role={enrolledSubject.roleTitle}
					/>
				))}
		</Stack>
	);
}
