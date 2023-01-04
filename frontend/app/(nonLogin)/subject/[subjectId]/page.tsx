import { Todo } from '../../../../typings';

const fetchSubject = async (subjectId: string) => {
	const res = await fetch(
		'https://jsonplaceholder.typicode.com/todos/' + subjectId
	);
	const subject: Todo = await res.json();
	return subject;
};

type PageProps = {
	params: {
		subjectId: string;
	};
};

async function SubjectPage(props: PageProps) {
	const todo = await fetchSubject(props.params.subjectId);

	return (
		<div>
			<p>This is a subject page</p>
			<h1>{todo.title}</h1>
			<p>{todo.completed}</p>
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
