'use client';

import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import Icon from '../../../../components/@studius/Icon/Icon';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { Section } from '../../../../components/@studius/PageElements/Section';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import useLogin from '../../../../components/hooks/LoginContext';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		userId: string;
	};
};

export default function SubjectPage(props: PageProps) {
	const router = useRouter();
	const user = trpc.user.getUserById.useQuery(props.params.userId);
	const deleteUser = trpc.user.deleteUserById.useMutation();
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(
		props.params.userId
	);

	useEffect(() => {
		if (deleteUser.status === 'success') {
			router.push('/user');
		}
	}, [deleteUser]);

	const sessionUser = useLogin().user;

	const googleLink = trpc.auth.external.google.link.useMutation();

	useEffect(() => {
		if (googleLink.isSuccess) {
			router.refresh();
		}
	}, [googleLink]);

	const [box, setBox] = useState(false);

	return (
		<PageStack>
			{user.isLoading ? (
				<Block>
					<Spinner />
				</Block>
			) : (
				<>
					<PageHeader
						title={
							user.data?.firstname && user.data?.lastname
								? user.data?.firstname + ' ' + user.data?.lastname
								: 'Subject'
						}
					/>
					<div className="flex gap-2">
						<Link href={'/user'}>
							<Button leftIcon="chevronLeft">Back to Users</Button>
						</Link>
						<Button
							onClick={() => {
								deleteUser.mutate(props.params.userId);
							}}
						>
							Delete me
						</Button>
					</div>

					{googleLink.isError && (
						<pre className="bg-danger-weak p-10 mb-4 rounded-2xl">
							{googleLink.error.shape?.message}
						</pre>
					)}
					{user.data && user.data.id == sessionUser?.userId && (
						<>
							<Section>
								<Stack>
									<h3 className="title1">Link with Google Account</h3>

									{user.data.googleUserId && (
										<Stack cols={2}>
											<Block info className="h-auto">
												<div className="flex flex-row gap-1">
													<p className="body2 text-info">
														<span>Google account is already linked</span>
													</p>
													<Icon icon="checkmark" className="bg-info" />
												</div>
											</Block>
											<Block danger className="h-auto">
												<p className="body2 text-danger">
													Warning: Linking with a new Google account will unlink
													it from the previous account!
												</p>
											</Block>
										</Stack>
									)}
									<Stack cols={2}>
										{user.data.googleUserId && (
											<Stack>
												<Button className="w-max bg-red-500">
													Unlink account
												</Button>
											</Stack>
										)}
										<Stack>
											<h3 className="title3">
												{user.data.googleUserId ? 'Relink' : 'Link'} account{' '}
											</h3>
											<GoogleLogin
												onSuccess={(response) => {
													if (response.credential) {
														googleLink.mutate({
															credential: response.credential,
															updateImage: box,
														});
													}
												}}
											/>
											<div className="flex flex-row gap-1">
												<input
													type="checkbox"
													onChange={(e) => {
														if (e.currentTarget.checked) {
															setBox(e.currentTarget.checked);
														}
													}}
												/>
												<span className="body3">Update profile picture</span>
											</div>
										</Stack>
									</Stack>
								</Stack>
							</Section>
						</>
					)}

					{deleteUser.isSuccess && (
						<Block>
							<pre>{JSON.stringify(deleteUser.data)}</pre>
						</Block>
					)}
					{deleteUser.error && (
						<Block>
							<pre>
								{JSON.stringify(deleteUser.error.shape?.message, null, 2)}
							</pre>
						</Block>
					)}

					<Block>
						<pre>{JSON.stringify(user.data, null, 2)}</pre>
					</Block>
					<div>
						<SectionTop>
							<h3 className="title2"> Enrolled subjects </h3>
						</SectionTop>
						<Stack cols={3}>
							{enrolledSubjects.isSuccess &&
								enrolledSubjects.data.map((enrolledSubject: any) => (
									<Link
										href={'/subject/' + enrolledSubject.subject.id}
										key={enrolledSubject.subject.id}
									>
										<Block>
											<p className="text-neutral-strong caption">
												{enrolledSubject.subject.id}
											</p>
											<p className="title2">{enrolledSubject.subject.title}</p>
										</Block>
									</Link>
								))}
						</Stack>
					</div>

					<Block>
						<pre>{JSON.stringify(enrolledSubjects.data, null, 2)}</pre>
					</Block>
				</>
			)}
		</PageStack>
	);
}
