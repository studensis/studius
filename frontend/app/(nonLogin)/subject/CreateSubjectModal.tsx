import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { TextInput } from '../../../components/@studius/Input/TextInput';
import { Block } from '../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';

export const CreateSubjectModal = () => {
	const createSubject = trpc.subject.createSubject.useMutation();

	const [formData, setFormData] = useState<{
		id: undefined;
		title: string;
		description: string;
		ECTS: string;
		semester: 'WINTER' | 'SUMMER';
		status: 'ACTIVE';
	}>({
		id: undefined,
		title: '',
		description: '',
		ECTS: '',
		semester: 'WINTER',
		status: 'ACTIVE',
	});

	const router = useRouter();

	useEffect(() => {
		if (createSubject.status === 'success') {
			router.push('/subject');
		}
		console.log(createSubject.status);
	}, [createSubject]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Create Subject</h1>

					{createSubject.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(createSubject.data)}</pre>
						</Block>
					)}
					{createSubject.isError && createSubject.error.shape && (
						<Block danger>
							<pre>{createSubject.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'Title'}
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
									onChange={(e) => {
										setFormData({
											...formData,
											description: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									placeholder={'ECTS'}
									onChange={(e) => {
										setFormData({
											...formData,
											ECTS: e.currentTarget.value,
										});
									}}
								/>
							</Stack>
							<select
								className="flex items-center outline-none text-neutral rounded-xl bg-neutral-weak p-4 "
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
									className="mt-4"
									onClick={() => {
										console.log(formData);

										createSubject.mutate({
											description: formData.description,
											ectsBod: formData.ECTS,
											semester: formData.semester,
											title: formData.title,
											status: 'ACTIVE',
										});
									}}
								>
									Create Subject
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
