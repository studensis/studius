import Tag from '../../../components/@studius/Tag/Tag';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const { user } = useLogin();
	const subjectList = trpc.user.getEnrolledSubjects.useQuery(user!.userId);
	return (
		<>
			<div className="grid gap-2 grid-cols-2">
				{subjectList.data &&
					subjectList.data.map((subject) => (
						<>
							<div className="bg-section rounded-2xl p-10">
								<div className="p caption text-neutral-strong">
									{subject.subject.id} [
									{subject.subject.ectsBod}]
								</div>
								{subject.subject.title}
								{subject.roleTitle !== 'STUDENT' && (
									<>
										<br />
										<Tag>{subject.roleTitle}</Tag>
									</>
								)}
							</div>
						</>
					))}
			</div>
		</>
	);
}
