'use client';

import Link from 'next/link';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		subjectId: string;
	};
};

function SubjectPage(props: PageProps) {
	const todo = trpc.subject.getSubjectById.useQuery(props.params.subjectId);
	const enrolled = trpc.subject.getEnrolledUsers.useQuery(
		props.params.subjectId
	);

	return (
		<>
			<div>
				<p>This is a subject page</p>
				<h1 className="display3">{todo.data?.title}</h1>
				<p>{todo.data?.description}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
				{enrolled.data &&
					enrolled.data.map((enrolledUser: any) => (
						<Link
							href={'/user/' + enrolledUser.user.id}
							key={enrolledUser.user.id}
						>
							<div className="p-10 bg-section rounded-3xl">
								<p className="title1">
									{enrolledUser.user.firstname}
								</p>
								<p className="body1">
									[{enrolledUser.user.lastname}]
								</p>
							</div>
						</Link>
					))}
			</div>
		</>
	);
}

export default SubjectPage;

// export async function generateStaticParams() {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/todos/');
// 	let todos: Todo[] = await res.json();

// 	// rate limiting prevention, will prerender first 10 items only.
// 	todos = todos.splice(10);

// 	return todos.map((todo) => {
// 		return { subjectId: todo.id.toString() };
// 	});
// }
