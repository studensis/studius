'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../../components/@studius/Protected/Protected';
import { Spinner } from '../../../../components/@studius/Spinner/Spinner';
import useLogin from '../../../../components/hooks/LoginContext';
import { trpc } from '../../../../components/hooks/TrpcProvider';
import { UpdateUserModal } from '../../admin/user-management/UpdateUserModal';

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
									<Button>Send Message</Button>
									<Protected minRole="ADMIN">
										<Button
											onClick={() => {
												deleteUser.mutate(props.params.userId);
											}}
										>
											Delete user
										</Button>

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
									</Protected>
								</div>
							</>
						}
					/>
					{/* <div className="flex gap-2">
						<Link href={'/user'}>
							<Button leftIcon="chevronLeft">Back to Users</Button>
						</Link>
					</div> */}

					{/* {deleteUser.isSuccess && (
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
					)} */}

					<Protected minRole="ADMIN">
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
					</Protected>
				</>
			)}
		</PageStack>
	);
}
