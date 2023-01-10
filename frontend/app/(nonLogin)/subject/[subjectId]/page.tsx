'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import UserCard from '../../../../components/Cards/UserCard';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import EnrollSection from './EnrollSection';

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
	const router = useRouter();

	const enroll = trpc.user.updateEnrollment.useMutation();

	const [enrollmentPage, setEnrollmentPage] = useState(false);

	function unenroll(id: string) {
		enroll.mutate({
			userId: id,
			subjectId: props.params.subjectId,
			status: 'ARCHIVED',
		});
		//Iz nekog razloga refresh ne radi, nego da vidis promjenu moras promjenit tab pa se vratit.
		router.refresh();
	}

	return (
		<>
			<PageStack>
				<PageHeader
					title={subject.data?.title || 'Subject'}
					description={subject.data?.description}
				/>

				<div>
					<Button
						onClick={() => {
							setEnrollmentPage(!enrollmentPage);
						}}
						className="m-5 mb-8"
					>
						Enroll Users
					</Button>

					{enrollmentPage && (
						<EnrollSection
							enrollmentPage={enrollmentPage}
							setEnrollmentPage={setEnrollmentPage}
							subjectId={props.params.subjectId}
						/>
					)}

					<SectionTop>
						<h3 className="title2">List of enrolled Users:</h3>
					</SectionTop>
					<Stack cols={2}>
						{enrolledUsers.data &&
							enrolledUsers.data.map((enrolledUser) => {
								return (
									<div key={enrolledUser.userId} className="flex items-center">
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
