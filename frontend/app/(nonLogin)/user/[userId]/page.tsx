'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
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
		console.log(deleteUser.status);
	}, [deleteUser]);

	return (
		<PageStack>
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

			{deleteUser.isSuccess && (
				<Block>
					<pre>{JSON.stringify(deleteUser.data)}</pre>
				</Block>
			)}
			{deleteUser.error && (
				<Block>
					<pre>{JSON.stringify(deleteUser.error.shape?.message, null, 2)}</pre>
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
		</PageStack>
	);
}
