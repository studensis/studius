import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserEntity } from 'studius-backend/src/domain/User/model/UserEntity';
import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../../components/@studius/Table/Table';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { UpdateUserModal } from './UpdateUserModal';

const List = ({
	numberOfUsersBeingDisplayed,
}: {
	numberOfUsersBeingDisplayed: number;
}) => {
	const [filteredUsers, setFilteredUsers] = useState<UserEntity[]>();
	const [filterBy, setFilterBy] = useState<String>('');

	const [pageNumber, setPageNumber] = useState(1);

	const usersBeingDisplayed = trpc.user.listUsersPaginated.useQuery({
		objectsPerPage: numberOfUsersBeingDisplayed,
		pageNumber: pageNumber - 1,
	});

	useEffect(() => {
		setFilteredUsers(
			usersBeingDisplayed.data?.users.filter((user) => {
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

	const { setModal } = useDialog();
	const router = useRouter();

	const deleteUser = trpc.user.deleteUserById.useMutation();

	useEffect(() => {
		if (deleteUser.isSuccess) {
			usersBeingDisplayed.refetch();
		}
	}, [deleteUser]);

	useEffect(() => {
		setPageNumber(1);
		console.log('AA');
	}, [numberOfUsersBeingDisplayed]);

	return (
		<>
			{usersBeingDisplayed.isLoading && <Spinner />}
			{usersBeingDisplayed.data && (
				<>
					<div className="m-4  flex content-center gap-2">
						<p className="title1 m-2">Filter:</p>
						<input
							className="rounded-xl w-full border-accent border-2 p-2 outline-none bg-neutral-weak max-w-[500px]"
							type="text"
							onChange={(e) => {
								setFilterBy(e.target.value);
							}}
						/>
						<div className="flex w-full">
							<Button
								leftIcon={'chevronLeft'}
								outline
								onClick={() => {
									if (pageNumber > 1) {
										setPageNumber(pageNumber - 1);
									}
								}}
							/>
							<p className="text-center text-justify">{pageNumber}</p>
							<Button
								leftIcon={'chevronRight'}
								outline
								onClick={() => {
									if (
										Math.ceil(
											usersBeingDisplayed.data?.numberOfUsers /
												numberOfUsersBeingDisplayed
										) > pageNumber
									) {
										setPageNumber(pageNumber + 1);
									}
								}}
							/>
						</div>
					</div>
					<Table
						titles={{
							id: 'ID',
							firstname: 'First name',
							lastname: 'Last name',
							userRole: 'Role',
						}}
						objects={
							filteredUsers
								? filteredUsers
								: usersBeingDisplayed.data.users || []
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
				</>
			)}
		</>
	);
};
function UserList() {
	const [numberOfUsersBeingDisplayed, setNumberOfUsersBeingDisplayed] =
		useState<number>(5);

	return (
		<>
			<label htmlFor="selectedUsersPerPage">Number of Users Per Page:</label>
			<select
				id="cars"
				name="cars"
				onChange={(e) => {
					setNumberOfUsersBeingDisplayed(parseInt(e.target.value));
				}}
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="50">50</option>
				<option value="100">100</option>
			</select>
			<List numberOfUsersBeingDisplayed={numberOfUsersBeingDisplayed} />
		</>
	);
}

export default UserList;
