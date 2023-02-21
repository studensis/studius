import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Table } from '../../../../components/@studius/Table/Table';
import { UpdateSubjectModal } from './UpdateSubjectModal';

import { useRouter } from 'next/navigation';
import { Button } from '../../../../components/@studius/Button/Button';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

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
												subjectList.refetch();
											}}
										></Button>
									</div>
								</>
							);
						}}
					></Table>
				</Block>
			</Stack>
		</>
	);
}
