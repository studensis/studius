import { FC } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import UserCard from '../../../../components/Cards/UserCard';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	subjectId: string;
	roleTitle: 'STUDENT' | 'PROFESSOR' | 'OWNER' | 'DEMONSTRATOR' | 'ASSISTANT';
};

const UserList: FC<PageProps> = ({ subjectId, roleTitle }) => {
	const enrolledUsers = trpc.subject.getEnrolledUsers.useQuery(subjectId);

	const enroll = trpc.user.updateEnrollment.useMutation();
	function unenroll(id: string) {
		enroll.mutate({
			userId: id,
			subjectId: subjectId,
			status: 'ARCHIVED',
		});
	}

	return (
		<div className="rounded-xl shadow-xl border-accent-medium border-[2px] m-4 p-4 ">
			<h1 className="title1 m-4 ">{roleTitle}S:</h1>
			<Stack cols={2}>
				{enrolledUsers.data &&
					enrolledUsers.data.map((enrolledUser) => {
						return (
							<div key={enrolledUser.userId} className="flex items-center">
								{enrolledUser.roleTitle == roleTitle ? (
									<div className="w-full">
										<UserCard
											user={enrolledUser.user}
											roleTitle={enrolledUser.roleTitle}
											enrolled={true}
										/>
										<Button
											onClick={() => unenroll(enrolledUser.userId)}
											active={true}
											className="title1 m-4"
										>
											Remove from subject
										</Button>
									</div>
								) : (
									<></>
								)}
							</div>
						);
					})}
			</Stack>
		</div>
	);
};

export default UserList;
