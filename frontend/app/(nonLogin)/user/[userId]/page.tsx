'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
		<div>
			<Link href="/user">
				<p className="title2 mb-12">{'<-'} back to Users</p>
			</Link>
			<h2 className="display2">{user.data?.firstname}</h2>
			<button
				className="p-4 bg-red-500"
				onClick={() => {
					deleteUser.mutate(props.params.userId);
				}}
			>
				Delete me
			</button>

			{deleteUser.isSuccess && (
				<pre className="p-4 bg-neutral-weak">
					{JSON.stringify(deleteUser.data)}
				</pre>
			)}
			{deleteUser.error && (
				<pre className="p-4 bg-danger">
					{JSON.stringify(deleteUser.error.shape?.message, null, 2)}
				</pre>
			)}
			<pre className=" bg-neutral-weak p-8">
				{JSON.stringify(user.data, null, 2)}
			</pre>
			<h3 className="title2"> Enrolled subjects </h3>
			<div className="grid gap-2 grid-cols-1 md:grid-cols-3">
				{enrolledSubjects.isSuccess &&
					enrolledSubjects.data.map((enrolledSubject) => (
						<Link href={'/subject/' + enrolledSubject.subject.id}>
							<div className="p-10 bg-section rounded-3xl">
								<p className="body">
									{enrolledSubject.subject.id}
								</p>
								<p className="title3">
									{enrolledSubject.subject.title}
								</p>
							</div>
						</Link>
					))}
			</div>
			<pre className=" bg-neutral-weak p-8">
				{JSON.stringify(enrolledSubjects.data, null, 2)}
			</pre>
		</div>
	);
}
