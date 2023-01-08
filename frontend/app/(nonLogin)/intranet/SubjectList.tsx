import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import Tag from '../../../components/@studius/Tag/Tag';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const { user } = useLogin();
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(user!.userId);
	return (
		<>
			<Stack cols={2}>
				{enrolledSubjects.data &&
					enrolledSubjects.data.map((enrolledSubject) => (
						<>
							<Block key={enrolledSubject.subject.id}>
								<div className="p caption text-neutral-strong">
									{enrolledSubject.subject.id} [
									{enrolledSubject.subject.ectsBod}]
								</div>
								{enrolledSubject.subject.title}
								{enrolledSubject.roleTitle !== 'STUDENT' && (
									<>
										<br />
										<Tag>{enrolledSubject.roleTitle}</Tag>
									</>
								)}
							</Block>
						</>
					))}
			</Stack>
		</>
	);
}
