import { Button } from '../../../components/@studius/Button/Button';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';
import { UpdateSubjectModal } from './UpdateSubjectModal';

export default function SubjectList() {
	const { setModal } = useDialog();

	const subjectList = trpc.subject.listSubjects.useQuery();
	const subjectDelete = trpc.subject.deleteSubjectById.useMutation();
	const subjectUpdate = trpc.subject.updateSubjectById;

	return (
		// <div className="">
		// 	<Stack cols={3} mobileCols={1}>
		// 		{subjects.isLoading && <Spinner />}
		// 		{subjects.data &&
		// 			subjects.data.map((subject) => <SubjectCard subject={subject} />)}
		// 	</Stack>
		// </div>
		<>
			<Table
				titles={{
					id: 'ID',
					title: 'Title',
					semester: 'Semester',
					ECTS: 'ECTS',
				}}
				objects={subjectList.data || []}
				actionRow={(subject) => {
					return (
						<>
							<div className="flex gap-2 flex-row-reverse">
								<Button
									leftIcon="delete"
									onClick={() => {
										subjectDelete.mutate(subject.id);
									}}
								></Button>
								<Button
									leftIcon="edit"
									onClick={() => {
										setModal(
											<UpdateSubjectModal
												subject={{
													id: subject.id,
													title: subject.title,
													description: subject.description,
													ECTS: subject.ectsBod,
													semester: subject.semester,
													status: subject.status,
												}}
											/>
										);
										// updateUser.mutate({
										// 	id: user.id,
										// 	firstname: 'Josip',
										// });
									}}
								></Button>
							</div>
						</>
					);
				}}
			></Table>
		</>
	);
}
