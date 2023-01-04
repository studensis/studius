'use client';

import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		subjectId: string;
	};
};

function SubjectPage(props: PageProps) {
	const todo = trpc.subject.getSubjectById.useQuery(props.params.subjectId);

	return (
		<div>
			<p>This is a subject page</p>
			<h1 className="display3">{todo.data?.title}</h1>
			<p>{todo.data?.description}</p>
		</div>
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
