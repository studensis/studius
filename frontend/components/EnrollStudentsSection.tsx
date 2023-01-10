import { useEffect, useState } from 'react';
import { Button } from './@studius/Button/Button';
import { Stack } from './@studius/PageElements/Stack';
import UserCard from './Cards/UserCard';
import { trpc } from './hooks/TrpcProvider';

type PageProps = {
	subjectId: string;
	setEnrollmentPage: Function;
	enrollmentPage: boolean;
};

const EnrollStudentsSection = (props: PageProps) => {
	const subject = trpc.subject.getSubjectById.useQuery(props.subjectId);

	const users = trpc.user.listUsers.useQuery();
	const enrolledUsers = trpc.subject.getEnrolledUsers.useQuery(props.subjectId);
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
	function enroll(id: string) {
		enrollUpdate.mutate({
			roleTitle: 'STUDENT',
			status: 'ACTIVE',
			subjectId: props.subjectId,
			userId: id,
		});
	}

	return (
		<div className="  fixed bg-gray-200 top-20 left-20  h-[80%] w-[80%] rounded-xl shadow-xl p-10">
			<h1 className="title1 text-center mb-8">
				Enroll Students to {subject.data?.title}
			</h1>
			<Stack cols={1}>
				{users.data &&
					users.data.map((user) => {
						if (ids.includes(user.id)) {
							return <></>;
						} else {
							return (
								<div className="flex items-center justify-center">
									<UserCard user={user} />
									<Button
										onClick={() => enroll(user.id)}
										active={true}
										className="title1 m-4"
									>
										Enroll to {subject.data?.title}
									</Button>
								</div>
							);
						}
					})}
			</Stack>
			<div className="flex justify-center mt-5">
				<Button
					onClick={() => {
						props.setEnrollmentPage(!props.enrollmentPage);
					}}
				>
					Zatvori izbornik
				</Button>
			</div>
		</div>
	);
};

export default EnrollStudentsSection;
