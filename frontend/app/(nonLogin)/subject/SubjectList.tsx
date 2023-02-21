import { useRouter } from 'next/navigation';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const { setModal } = useDialog();

	const router = useRouter();

	const subjectList = trpc.subject.listSubjects.useQuery();
	const subjectDelete = trpc.subject.deleteSubjectById.useMutation();

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
						<p className="title2 text-neutral">{subjectList.data?.length}</p>
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
						objects={subjectList.data || []}
					></Table>
				</Block>
			</Stack>
		</>
	);
}
