import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import Icon from '../../../../components/@studius/Icon/Icon';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Table } from '../../../../components/@studius/Table/Table';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	subjectId: string;
	setEnrollmentPage: Function;
	enrollmentPage: boolean;
};

type role = 'STUDENT' | 'PROFESSOR' | 'OWNER' | 'DEMONSTRATOR' | 'ASSISTANT';

export const EnrollUsersModal = (props: PageProps) => {
	const updateUser = trpc.user.updateUserById.useMutation();

	const subject = trpc.subject.getSubjectById.useQuery(props.subjectId);

	const users = trpc.user.listUsers.useQuery();
	const enrolledUsers = trpc.subject.getEnrolledUsers.useQuery(props.subjectId);

	const [success, setSuccess] = useState('');
	const [ids, setIds] = useState<string[]>([]);
	const [selectedRole, setSelectedRole] = useState<role>('STUDENT');

	const router = useRouter();
	const { setModal } = useDialog();

	useEffect(() => {
		if (enrolledUsers.data) {
			setIds(
				enrolledUsers.data
					.filter((user) => user.status == 'ACTIVE')
					.map((user) => user.userId)
			);
		}
	}, [enrolledUsers]);

	const enrollUpdate = trpc.user.enrollUser.useMutation();

	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function enroll(
		id: string,
		roleTitle: 'STUDENT' | 'PROFESSOR' | 'OWNER' | 'DEMONSTRATOR' | 'ASSISTANT'
	) {
		setSuccess('Loading');
		enrollUpdate.mutate({
			roleTitle: roleTitle,
			status: 'ACTIVE',
			subjectId: props.subjectId,
			userId: id,
		});
		setSuccess('Updated');
		await delay(1500);
		setSuccess('');
	}

	return (
		<>
			<div className="flex flex-col justify-center bg-gray-200 rounded-xl p-10 w-[120%]">
				<h1 className="title1 text-center mb-10">
					Enroll Students to {subject.data?.title}
				</h1>
				<div className="w-[100%]">
					<Table
						titles={{
							name: 'Full name',
							userRole: 'Role',
						}}
						objects={
							users.data?.map((user) => ({
								name: user.firstname + ' ' + user.lastname,
								userRole: user.userRole,
								id: user.id,
							})) || []
						}
						actionRow={(user) => {
							return (
								<>
									<div className="flex gap-2 flex-row">
										<select
											name="cars"
											id="cars"
											onChange={(e) => setSelectedRole(e.target.value as role)}
											className="mb-14 mt-0 -ml-20"
										>
											<option value="STUDENT">STUDENT</option>
											<option value="PROFESSOR">PROFESSOR</option>
											<option value="OWNER">OWNER</option>
											<option value="DEMONSTRATOR">DEMONSTRATOR</option>
											<option value="ASSISTANT">ASSISTANT</option>
										</select>
										<Button
											onClick={() => enroll(user.id, selectedRole)}
											active={true}
											className="title1 m-4 mb-14"
											loading={enrollUpdate.isLoading}
										>
											<Icon icon="checkmark" className="bg-white" />
										</Button>
									</div>
								</>
							);
						}}
						onClick={(user) => {
							router.push('/user/' + user.id);
							console.log(user);
						}}
					/>
				</div>
			</div>
		</>
	);
};
