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
	const [numberOfUsersBeingDisplayed, setNumberOfUsersBeingDisplayed] =
		useState<number>(10);
	const [usersBeingDisplayed, setUsersBeingDisplayed] = useState(
		trpc.user.listUsersPaginated.useQuery({
			objectsPerPage: numberOfUsersBeingDisplayed,
			pageNumber: 1,
		})
	);

	const deleteUser = trpc.user.deleteUserById.useMutation();
	const updateUser = trpc.user.updateUserById.useMutation();
	const { setModal } = useDialog();
	const router = useRouter();

	const [filteredUsers, setFilteredUsers] = useState<UserEntity[]>();
	const [filterBy, setFilterBy] = useState<String>('');

	useEffect(() => {
		setFilteredUsers(
			usersBeingDisplayed.data?.filter((user) => {
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
			usersBeingDisplayed.refetch();
			users.refetch();
		}
	}, [updateUser]);

	useEffect(() => {
		if (deleteUser.isSuccess) {
			usersBeingDisplayed.refetch();
			users.refetch();
		}
	}, [deleteUser]);

	useEffect(
		() =>
			setUsersBeingDisplayed(
				trpc.user.listUsersPaginated.useQuery({
					objectsPerPage: numberOfUsersBeingDisplayed,
					pageNumber: 1,
				})
			),
		[numberOfUsersBeingDisplayed]
	);

	return (
		<>
			{usersBeingDisplayed.isLoading && <Spinner />}
			{usersBeingDisplayed.data && (
				<Stack cols={1}>
					<Stack cols={3} mobileCols={1}>
						<Block>
							<p className="caption text-neutral-strong">Number of Users</p>
							<p className="title2 text-neutral">{users.data?.length}</p>
						</Block>
					</Stack>
					<Block>
						<Button
							onClick={() => {
								usersBeingDisplayed.refetch();
								users.refetch();
							}}
							loading={usersBeingDisplayed.isLoading}
						>
							Refetch
						</Button>
						<div className="m-4  flex content-center gap-2">
							<p className="title1 m-2">Filter:</p>
							<input
								className="rounded-xl w-full border-accent border-2 p-2 outline-none bg-neutral-weak max-w-[500px]"
								type="text"
								onChange={(e) => {
									setFilterBy(e.target.value);
								}}
							/>
							<div>
								<p className="title1 m-2 whitespace-nowrap">Users Per Page: </p>
							</div>

							<input
								className="rounded-xl w-full border-accent border-2 p-2 outline-none bg-neutral-weak max-w-[500px]"
								type="text"
								onChange={(e) => {
									setNumberOfUsersBeingDisplayed(parseInt(e.target.value));
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
							objects={
								filteredUsers ? filteredUsers : usersBeingDisplayed.data || []
							}
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
													usersBeingDisplayed.refetch();
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
