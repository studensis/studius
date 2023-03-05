import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserEntity } from 'studius-backend/src/domain/User/model/UserEntity';
import { Button } from '../../../../components/@studius/Button/Button';
import Dropdown from '../../../../components/@studius/Dropdown/Dropdown';
import { TextInput } from '../../../../components/@studius/Input/TextInput';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../../components/@studius/Table/Table';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { UpdateUserModal } from './UpdateUserModal';

const List = ({
	numberOfUsersBeingDisplayed,
	changeOption,
	options,
}: {
	numberOfUsersBeingDisplayed: number;
	changeOption: Function;
	options: number[];
}) => {
	const [filteredUsers, setFilteredUsers] = useState<UserEntity[]>();
	const [filterBy, setFilterBy] = useState<String>('');

	const [pageNumber, setPageNumber] = useState(1);

	const [numberOfFilteredUsers, setNumberOfFilteredUsers] = useState<number>(0);

	const [refilterUsers, setRefilterUsers] = useState(false);

	const usersBeingDisplayed = trpc.user.listUsersPaginated.useQuery({
		objectsPerPage: numberOfUsersBeingDisplayed,
		pageNumber: pageNumber - 1,
	});

	useEffect(() => {
		setFilteredUsers(
			usersBeingDisplayed.data?.users.filter((user) => {
				setNumberOfFilteredUsers(numberOfFilteredUsers + 1);
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
	});

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
	}, [numberOfUsersBeingDisplayed]);

	return (
		<>
			<Block>
				<div className="m-4  flex justify-between gap-2">
					<div className="flex">
						<TextInput
							// className="rounded-xl w-full border-neutral-medium focus:border-accent focus:shadow-sm-bottom border- p-2 outline-none duration-100 bg-section max-w-[500px]"
							type="text"
							placeholder="Filter by"
							onChange={(e) => {
								setFilterBy(e.target.value);
							}}
						/>
					</div>

					<div className="flex">
						<Dropdown
							options={options}
							changeOption={changeOption}
							option={numberOfUsersBeingDisplayed}
						></Dropdown>
						<Button
							leftIcon={'chevronLeft'}
							outline
							onClick={() => {
								setRefilterUsers(!refilterUsers);
								if (pageNumber > 1) {
									setPageNumber(pageNumber - 1);
								}
							}}
							className="ml-[16px]"
						/>
						<p className="text-center body3 px-2 pt-3">{pageNumber}</p>
						<Button
							leftIcon={'chevronRight'}
							outline
							onClick={() => {
								setRefilterUsers(!refilterUsers);
								if (
									usersBeingDisplayed.data &&
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
				{usersBeingDisplayed.isLoading && <Spinner />}
				{usersBeingDisplayed.data && (
					<>
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
			</Block>
		</>
	);
};

function UserList() {
	const [numberOfUsersBeingDisplayed, setNumberOfUsersBeingDisplayed] =
		useState<number>(5);

	const [option, setOption] = useState(5);

	const changeOption = (changedOption: number) => {
		setOption(changedOption);
	};

	return (
		<>
			<Stack>
				<List
					numberOfUsersBeingDisplayed={option}
					options={[5, 10, 30, 50, 100]}
					changeOption={changeOption}
				/>
			</Stack>
		</>
	);
}

export default UserList;
