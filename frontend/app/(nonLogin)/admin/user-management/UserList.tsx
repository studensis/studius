'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserEntity } from 'studius-backend/src/domain/User/model/UserEntity';
import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../../components/@studius/Table/Table';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { UpdateUserModal } from './UpdateUserModal';

export default function SubjectList() {
	const users = trpc.user.listUsers.useQuery();
	const deleteUser = trpc.user.deleteUserById.useMutation();
	const updateUser = trpc.user.updateUserById.useMutation();
	const { setModal } = useDialog();
	const router = useRouter();

	const [filteredUsers, setFilteredUsers] = useState<UserEntity[]>();
	const [filterBy, setFilterBy] = useState<String>('');

	useEffect(() => {
		setFilteredUsers(
			users.data?.filter((user) => {
				if (filterBy == '') {
					return true;
				}
				if (filterBy) {
					return (
						user.firstname
							.toLowerCase()
							.includes(filterBy.toLocaleLowerCase()) ||
						user.lastname.toLowerCase().includes(filterBy.toLocaleLowerCase())
					);
				}
			})
		);
	}, [filterBy]);

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
						<div className="m-4  ">
							<p className="title1 m-2">Filter:</p>
							<input
								className="rounded-xl w-full border-accent border-2 p-4 outline-none "
								type="text"
								onChange={(e) => {
									setFilterBy(e.target.value);
								}}
							/>
						</div>
						<Table
							titles={{
								id: 'ID',
								firstname: 'First name',
								lastname: 'Last name',
								userRole: 'Role',
							}}
							objects={filteredUsers ? filteredUsers : users.data || []}
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
								router.push('/user/' + user.id);
								console.log(user);
							}}
						/>
					</Block>
				</Stack>
			)}
		</>
	);
}
