'use client';

import { Button } from '../../../../components/@studius/Button/Button';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import UserCard from '../../../../components/Cards/UserCard';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		subjectId: string;
	};
};

function SubjectPage(props: PageProps) {
	const subject = trpc.subject.getSubjectById.useQuery(props.params.subjectId);
	const enrolledUsers = trpc.subject.getEnrolledUsers.useQuery(
		props.params.subjectId
	);

	const enroll = trpc.user.updateEnrollment.useMutation();

	function unenroll(id: string) {
		enroll.mutate({
			userId: id,
			subjectId: props.params.subjectId,
			status: 'ARCHIVED',
		});
	}

	return (
		<>
			<PageStack>
				<PageHeader
					title={subject.data?.title || 'Subject'}
					description={subject.data?.description}
				/>

				<div>
					<SectionTop>
						<h3 className="title2">Enrolled Users</h3>
					</SectionTop>
					<Stack cols={2}>
						{enrolledUsers.data &&
							enrolledUsers.data.map((enrolledUser) => {
								return (
									<div className="flex items-center">
										<UserCard user={enrolledUser.user} />
										<Button
											onClick={() => unenroll(enrolledUser.userId)}
											active={true}
											className="title1 m-4"
										>
											Remove from subject
										</Button>
									</div>
								);
							})}
					</Stack>
				</div>
			</PageStack>
		</>
	);
}

export default SubjectPage;

// export async function generateStaticParams() {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/subjects/');
// 	let subjects: Todo[] = await res.json();

// 	// rate limiting prevention, will prerender first 10 items only.
// 	subjects = subjects.splice(10);

// 	return subjects.map((subject) => {
// 		return { subjectId: subject.id.toString() };
// 	});
// }
