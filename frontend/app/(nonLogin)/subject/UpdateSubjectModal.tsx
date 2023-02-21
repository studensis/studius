import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { TextInput } from '../../../components/@studius/Input/TextInput';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';

export const UpdateSubjectModal = ({
	subject,
}: {
	subject: {
		id: string;
		title: string;
		description: string;
		ECTS: string;
		semester: 'WINTER' | 'SUMMER';
		status: 'ACTIVE' | 'ARCHIVED';
	};
}) => {
	const updateSubject = trpc.subject.updateSubjectById.useMutation();

	const [formData, setFormData] = useState<{
		id: string;
		title: string;
		description: string;
		ECTS: string;
		semester: 'WINTER' | 'SUMMER';
		status: 'ACTIVE' | 'ARCHIVED';
	}>(subject);

	const router = useRouter();
	const { setModal } = useDialog();

	useEffect(() => {
		if (updateSubject.isSuccess) {
			setModal(null);
		}
		console.log(updateSubject.status);
	}, [updateSubject]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Edit Subject</h1>

					{updateSubject.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(updateSubject.data)}</pre>
						</Block>
					)}
					{updateSubject.isError && updateSubject.error.shape && (
						<Block danger>
							<pre>{updateSubject.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'Title'}
								value={subject.title}
								onChange={(e) => {
									setFormData({
										...formData,
										title: e.currentTarget.value,
									});
								}}
							/>
							<Stack cols={2}>
								<TextInput
									placeholder={'Description'}
									value={subject.description}
									onChange={(e) => {
										setFormData({
											...formData,
											description: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									placeholder={'ECTS'}
									value={subject.ECTS}
									onChange={(e) => {
										setFormData({
											...formData,
											ECTS: e.currentTarget.value,
										});
									}}
								/>
							</Stack>
							<select
								className="flex items-center outline-none text-neutral rounded-xl bg-neutral-weak p-4 overflow-hidden"
								onChange={(e) => {
									e.target.value == 'SUMMER'
										? setFormData({ ...formData, semester: 'SUMMER' })
										: setFormData({ ...formData, semester: 'WINTER' });
								}}
								id="semester"
								name="semester"
								multiple
							>
								<option className="m-3 text-neutral-400" value="WINTER">
									Winter
								</option>
								<option className="m-3 text-neutral-400" value="SUMMER">
									Summer
								</option>
							</select>
							<div className="sticky bottom-0 left-0">
								<Button
									onClick={() => {
										console.log(formData);

										updateSubject.mutate({
											id: subject.id,
											description: formData.description,
											ectsBod: formData.ECTS,
											title: formData.title,
											status: formData.status,
											semester: formData.semester,
										});

										// router.refresh();
									}}
								>
									Update Subject
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
