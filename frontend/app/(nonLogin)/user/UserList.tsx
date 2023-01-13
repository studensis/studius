'use client';

import { useEffect } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';
import { UpdateUserModal } from './UpdateUserModal';

export default function SubjectList() {
	const users = trpc.user.listUsers.useQuery();
	const deleteUser = trpc.user.deleteUserById.useMutation();
	const updateUser = trpc.user.updateUserById.useMutation();

	useEffect(() => {
		if (updateUser.isSuccess) {
			users.refetch();
		}
	}, [updateUser]);
	useEffect(() => {
		if (deleteUser.isSuccess) {
			users.refetch();
		}
	}, [deleteUser]);

	const { setModal } = useDialog();

	return (
		<>
			{users.isLoading && <Spinner />}
			{users.data && (
				<Stack cols={1}>
					<Stack cols={3} mobileCols={1}>
						<Block>
							<p className="caption text-neutral-strong">Number of Users</p>
							<p className="title2 text-neutral">{users.data.length}</p>
						</Block>
					</Stack>
					<Block>
						<Button
							onClick={() => {
								users.refetch();
							}}
							loading={users.isLoading}
						>
							Refetch
						</Button>
						<Table
							titles={{
								id: 'ID',
								firstname: 'First name',
								lastname: 'Last name',
								userRole: 'Role',
							}}
							objects={users.data || []}
							actionRow={(user) => {
								return (
									<>
										<div className="flex gap-2 flex-row-reverse">
											<Button
												leftIcon="delete"
												onClick={() => {
													deleteUser.mutate(user.id);
												}}
											></Button>
											<Button
												leftIcon="edit"
												onClick={() => {
													setModal(
														<UpdateUserModal
															user={{
																id: user.id,
																password: user.password,
																firstname: user.firstname,
																lastname: user.lastname,
																jmbag: user.jmbag,
																email: user.email,
																mentorID: user.mentorID,
																userRole: user.userRole,
															}}
														/>
													);
													users.refetch();
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
							onClick={(user) => {
								console.log(user);
							}}
						/>
					</Block>
				</Stack>
			)}
		</>
	);
}
