import { useEffect, useState } from 'react';
import { Button } from '../../../../../components/@studius/Button/Button';
import { Stack } from '../../../../../components/@studius/PageElements/Stack';
import UserCard from '../../../../../components/Cards/UserCard';
import { trpc } from '../../../../../components/hooks/TrpcProvider';

type PageProps = {
	subjectId: string;
	setEnrollmentPage: Function;
	enrollmentPage: boolean;
};

const EnrollSection = (props: PageProps) => {
	const subject = trpc.subject.getSubjectById.useQuery(props.subjectId);

	const users = trpc.user.listUsers.useQuery();
	const enrolledUsers = trpc.subject.getEnrolledUsers.useQuery({
		subjectId: props.subjectId,
	});

	const [success, setSuccess] = useState('');
	const [ids, setIds] = useState<string[]>([]);

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
		<div>
			<div
				className={
					success == ''
						? ''
						: 'absolute top-10 left-32 title1 text-success border-success border-[2px] bg-gray-100  rounded-xl shadow-xl p-4 '
				}
			>
				{success}
			</div>
			<div className="absolute bg-gray-200 top-28 left-20 h-[35vw] overflow-y-scroll w-[80%] rounded-xl shadow-2xl p-10 ">
				<div>
					<h1 className="title1 text-center mb-8">
						Enroll Students to {subject.data?.title}
					</h1>
					<div className="flex justify-center mt-5">
						<Button
							onClick={() => {
								props.setEnrollmentPage(!props.enrollmentPage);
							}}
						>
							Zatvori izbornik
						</Button>
					</div>
					<Stack cols={1}>
						{users.data &&
							users.data
								.filter((user) => !ids.includes(user.id))
								.map((user) => (
									<div
										className="flex items-center justify-center"
										key={user.id}
									>
										<UserCard user={user} role={'STUDENT'} />
										<Button
											onClick={() => enroll(user.id, 'PROFESSOR')}
											active={true}
											className="title1 m-4"
										>
											Professor
										</Button>
										<Button
											onClick={() => enroll(user.id, 'ASSISTANT')}
											active={true}
											className="title1 m-4"
										>
											Assistant
										</Button>
										<Button
											onClick={() => enroll(user.id, 'OWNER')}
											active={true}
											className="title1 m-4"
										>
											Owner
										</Button>
										<Button
											onClick={() => enroll(user.id, 'DEMONSTRATOR')}
											active={true}
											className="title1 m-4"
										>
											Demonstrator
										</Button>
										<Button
											onClick={() => enroll(user.id, 'STUDENT')}
											active={true}
											className="title1 m-4"
										>
											Student
										</Button>
									</div>
								))}
					</Stack>
				</div>
			</div>
		</div>
	);
};

export default EnrollSection;
