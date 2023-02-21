import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { TextInput } from '../../../../components/@studius/Input/TextInput';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import Protected from '../../../../components/@studius/Protected/Protected';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const UpdateUserModal = ({
	user,
}: {
	user: {
		id: string;
		password: string;
		firstname: string;
		lastname: string;
		jmbag: string | null;
		email: string;
		mentorID: string | null;
		userRole: 'DEFAULT' | 'ADMIN' | 'SUPERADMIN';
	};
}) => {
	const updateUser = trpc.user.updateUserById.useMutation();

	const [formData, setFormData] = useState<{
		id: string;
		password: string;
		firstname: string;
		lastname: string;
		jmbag: string | null;
		email: string;
		mentorID: string | null;
		userRole: 'DEFAULT' | 'ADMIN' | 'SUPERADMIN';
	}>(user);

	const router = useRouter();
	const { setModal } = useDialog();

	useEffect(() => {
		if (updateUser.isSuccess) {
			setModal(null);
		}
		console.log(updateUser.status);
	}, [updateUser]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Edit User</h1>

					{updateUser.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(updateUser.data)}</pre>
						</Block>
					)}
					{updateUser.isError && updateUser.error.shape && (
						<Block danger>
							<pre>{updateUser.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'password'}
								value={user.password}
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
									value={user.firstname}
									onChange={(e) => {
										setFormData({
											...formData,
											firstname: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									placeholder={'lastname'}
									value={user.lastname}
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
								value={user.jmbag}
								disabled
								onChange={(e) => {
									setFormData({
										...formData,
										jmbag: e.currentTarget.value,
									});
								}}
							/>
							<TextInput
								placeholder={'email'}
								value={user.email}
								onChange={(e) => {
									setFormData({
										...formData,
										email: e.currentTarget.value,
									});
								}}
							/>
							<TextInput
								placeholder={'mentorID'}
								value={user.mentorID}
								onChange={(e) => {
									setFormData({
										...formData,
										mentorID: e.currentTarget.value,
									});
								}}
							/>
							<Protected minRole="SUPERADMIN">
								<select
									className="flex items-center outline-none text-neutral rounded-xl bg-neutral-weak p-4 overflow-hidden "
									onChange={(e) => {
										setFormData({
											...formData,
											userRole: e.target.value as
												| 'DEFAULT'
												| 'ADMIN'
												| 'SUPERADMIN',
										});
									}}
									multiple
								>
									<option className="m-2 p-2 text-neutral-400 " value="DEFAULT">
										DEFAULT
									</option>
									<option className="m-2 p-2 text-neutral-400" value="ADMIN">
										ADMIN
									</option>
									<option
										className="m-2 p-2 text-neutral-400"
										value="SUPERADMIN"
									>
										SUPERADMIN
									</option>
								</select>
							</Protected>

							<div className="sticky bottom-0 left-0">
								<Button
									onClick={() => {
										console.log(formData);

										updateUser.mutate({
											id: formData.id,
											email: formData.email,
											firstname: formData.firstname,
											lastname: formData.lastname,
											password: formData.password,
											...(formData.jmbag ? { jmbag: formData.jmbag } : {}),
											...(formData.mentorID
												? { mentorID: formData.mentorID }
												: {}),
											userRole: formData.userRole,
										});
									}}
								>
									Update User
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
