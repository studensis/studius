'use client';

import { GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import Icon from '../../../../components/@studius/Icon/Icon';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
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
import { UpdateUserModal } from '../UpdateUserModal';

type PageProps = {
	params: {
		userId: string;
	};
};

export default function UserPage(props: PageProps) {
	const router = useRouter();
	const user = trpc.user.getUserById.useQuery(props.params.userId, {
		refetchInterval: 10000,
	});
	const deleteUser = trpc.user.deleteUserById.useMutation();
	const updateUser = trpc.user.updateUserById.useMutation();
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(
		props.params.userId
	);
	const { refetch } = useLogin();

	const userWithoutPassword = user.data
		? (({ password, ...o }) => o)(user.data)
		: null;

	useEffect(() => {
		if (deleteUser.status === 'success') {
			router.push('/user');
		}
	}, [deleteUser]);

	const sessionUser = useLogin().user;

	const googleLink = trpc.auth.external.google.link.useMutation();

	useEffect(() => {
		if (updateUser.isSuccess) {
			// console.log('a');
			// user.refe
			refetch();
		}
	}, [updateUser]);
	useEffect(() => {
		if (googleLink.isSuccess) {
			// router.refresh();
			refetch();
		}
	}, [googleLink]);

	const [box, setBox] = useState(false);

	const { setModal } = useDialog();

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
						actionRow={
							<>
								<div className="flex flex-row gap-2">
									{sessionUser?.role !== 'DEFAULT' && (
										<Button
											onClick={() => {
												deleteUser.mutate(props.params.userId);
											}}
										>
											Delete me
										</Button>
									)}
									{user.data && user.data.id == sessionUser?.userId && (
										<>
											<Button
												onClick={() => {
													setModal(
														user.data ? (
															<UpdateUserModal user={user.data} />
														) : null
													);
												}}
											>
												Edit Profile
											</Button>
										</>
									)}
								</div>
							</>
						}
					/>
					{/* <div className="flex gap-2">
						<Link href={'/user'}>
							<Button leftIcon="chevronLeft">Back to Users</Button>
						</Link>
					</div> */}

					{/* Profile Section */}
					{user.data && user.data.id == sessionUser?.userId && (
						<>
							<Section>
								{googleLink.isError && (
									<pre className="bg-danger-weak p-10 mb-4 rounded-2xl">
										{googleLink.error.shape?.message}
									</pre>
								)}
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
												<Button
													className="w-max bg-danger"
													onClick={() => {
														updateUser.mutate({
															id: sessionUser!.userId,
															googleUserId: null,
														});
													}}
													loading={updateUser.isLoading}
												>
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
						<pre>{JSON.stringify(userWithoutPassword, null, 2)}</pre>
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
