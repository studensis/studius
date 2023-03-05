import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { TextInput } from '../../../../components/@studius/Input/TextInput';
import { Block } from '../../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const CreateUserModal = () => {
	const createUser = trpc.user.createUser.useMutation();

	const [formData, setFormData] = useState<{
		id: undefined;
		password: string;
		firstname: string;
		lastname: string;
		jmbag: string;
		email: string;
		mentorID: string;
		userRole: 'DEFAULT';
	}>({
		id: undefined,
		password: '',
		firstname: '',
		lastname: '',
		jmbag: '',
		email: '',
		mentorID: '',
		userRole: 'DEFAULT',
	});

	const router = useRouter();

	useEffect(() => {
		if (createUser.status === 'success') {
			router.push('/user');
		}
		console.log(createUser.status);
	}, [createUser]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Create User</h1>

					{createUser.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(createUser.data)}</pre>
						</Block>
					)}
					{createUser.isError && createUser.error.shape && (
						<Block danger>
							<pre>{createUser.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'password'}
								onChange={(e) => {
									setFormData({
										...formData,
										password: e.currentTarget.value,
									});
								}}
							/>
							<Stack cols={2}>
								<TextInput
									placeholder={'firstname'}
									onChange={(e) => {
										setFormData({
											...formData,
											firstname: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									placeholder={'lastname'}
									onChange={(e) => {
										setFormData({
											...formData,
											lastname: e.currentTarget.value,
										});
									}}
								/>
							</Stack>
							<TextInput
								placeholder={'jmbag'}
								onChange={(e) => {
									setFormData({
										...formData,
										jmbag: e.currentTarget.value,
									});
								}}
							/>
							<TextInput
								placeholder={'email'}
								onChange={(e) => {
									setFormData({
										...formData,
										email: e.currentTarget.value,
									});
								}}
							/>
							<TextInput
								placeholder={'mentorID'}
								onChange={(e) => {
									setFormData({
										...formData,
										mentorID: e.currentTarget.value,
									});
								}}
							/>
							<TextInput placeholder={'DEFAULT'} disabled />
							<div className="sticky bottom-0 left-0">
								<Button
									onClick={() => {
										console.log(formData);

										createUser.mutate({
											email: formData.email,
											firstname: formData.firstname,
											lastname: formData.lastname,
											password: formData.password,
											...(formData.jmbag ? { jmbag: formData.jmbag } : {}),
											...(formData.mentorID
												? { mentorID: formData.mentorID }
												: {}),
											userRole: 'DEFAULT',
										});
									}}
								>
									Create User
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
