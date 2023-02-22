import { useRouter } from 'next/navigation';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Table } from '../../../components/@studius/Table/Table';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const router = useRouter();
	const { user } = useLogin();

	const subjectList = trpc.user.getEnrolledSubjects
		.useQuery({ userId: user!.userId, active: true })
		.data?.map((enrollment) => {
			return enrollment.subject;
		});

	return (
		// <div className="">
		// 	<Stack cols={3} mobileCols={1}>
		// 		{subjects.isLoading && <Spinner />}
		// 		{subjects.data &&
		// 			subjects.data.map((subject) => <SubjectCard subject={subject} />)}
		// 	</Stack>
		// </div>
		<>
			<Stack cols={1}>
				<Stack cols={3} mobileCols={1}>
					<Block>
						<p className="caption text-neutral-strong">Number of Subjects</p>
						<p className="title2 text-neutral">{subjectList?.length}</p>
					</Block>
				</Stack>
				<Block>
					<Table
						titles={{
							id: 'ID',
							title: 'Title',
							semester: 'Semester',
							ectsBod: 'ECTS',
						}}
						onClick={(subject) => {
							router.push('/subject/' + subject.id);
						}}
						objects={subjectList || []}
					></Table>
				</Block>
			</Stack>
		</>
	);
}
