'use client';

import { useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import { PageStack } from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../../components/@studius/Protected/Protected';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import useLogin from '../../../../components/hooks/LoginContext';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { UpdateSubjectModal } from '../UpdateSubjectModal';
import EnrollSection from './EnrollSection';
import { EnrollUsersModal } from './EnrollUsersModal';
import { PinnedEvents } from './PinnedEvents';
import UserList from './UserList';

type PageProps = {
	params: {
		subjectId: string;
	};
};

const Content = ({ contentId }: { contentId: string }) => {
	const content = trpc.content.getContentById.useQuery(contentId);
	if (content.isLoading || !content.data) {
		return (
			<>
				<Spinner />
			</>
		);
	} else {
		return (
			<>
				<Block>{content.data.markdownText}</Block>
			</>
		);
	}
};

function SubjectPage(props: PageProps) {
	const subject = trpc.subject.getSubjectById.useQuery(props.params.subjectId, {
		refetchInterval: 10000,
	});
	const [enrollmentPage, setEnrollmentPage] = useState(false);
	const { user } = useLogin();

	const { setModal } = useDialog();

	return (
		<>
			<PageStack>
				{subject.isLoading ? (
					<Block>
						<Spinner />
					</Block>
				) : (
					<>
						<PageHeader
							title={subject.data?.title || 'Subject'}
							description={subject.data?.description}
							actionRow={
								<div className="flex flex-row">
									{user?.userId && (
										<>
											<Protected
												minSubjectRole="OWNER"
												subjectId={subject.data?.id}
											>
												<Button
													onClick={() => {
														setModal(
															<UpdateSubjectModal
																subject={{
																	id: subject.data ? subject.data.id : '',
																	title: subject.data ? subject.data.title : '',
																	description: subject.data
																		? subject.data.description
																		: '',
																	ECTS: subject.data
																		? subject.data.ectsBod
																		: '',
																	semester: subject.data
																		? subject.data.semester
																		: 'WINTER',
																	status: subject.data
																		? subject.data.status
																		: 'ACTIVE',
																}}
															/>
														);
													}}
													className="m-5 mb-8"
												>
													Edit Subject
												</Button>
											</Protected>
										</>
									)}

									{(user?.role == 'ADMIN' || user?.role == 'SUPERADMIN') && (
										<Button
											onClick={() => {
												setModal(
													<EnrollUsersModal
														enrollmentPage={enrollmentPage}
														setEnrollmentPage={setEnrollmentPage}
														subjectId={props.params.subjectId}
													/>
												);
											}}
											className="m-5 mb-8"
										>
											Enroll Users
										</Button>
									)}
								</div>
							}
						/>

						{enrollmentPage && (
							<EnrollSection
								enrollmentPage={enrollmentPage}
								setEnrollmentPage={setEnrollmentPage}
								subjectId={props.params.subjectId}
							/>
						)}

						{/* // {deleteSubject.isSuccess && (
						// 	<Block>
						// 		<pre>{JSON.stringify(deleteSubject.data)}</pre>
						// 	</Block>
						// )}
						// {deleteSubject.error && (
						// 	<Block>
						// 		<pre>
						// 			{JSON.stringify(deleteSubject.error.shape?.message, null, 2)}
						// 		</pre>
						// 	</Block>
						// )} */}

						<PinnedEvents subjectId={props.params.subjectId} />

						<div>
							<SectionTop>
								<h3 className="title2">List of enrolled Users:</h3>
							</SectionTop>
							<UserList
								roleTitle="PROFESSOR"
								subjectId={props.params.subjectId}
							/>
							<Protected
								minSubjectRole="DEMONSTRATOR"
								minRole="ADMIN"
								subjectId={props.params.subjectId}
							>
								<UserList
									roleTitle="STUDENT"
									subjectId={props.params.subjectId}
								/>
							</Protected>
							<UserList
								roleTitle="ASSISTANT"
								subjectId={props.params.subjectId}
							/>
							<UserList
								roleTitle="OWNER"
								subjectId={props.params.subjectId}
								// role={enrolledUser.roleTitle}
							/>
							<UserList
								roleTitle="DEMONSTRATOR"
								subjectId={props.params.subjectId}
							/>
						</div>

						{subject.data?.contentId &&
							// eslint-disable-next-line react/jsx-key
							subject.data!.contentId.map((id) => <Content contentId={id} />)}
					</>
				)}
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
