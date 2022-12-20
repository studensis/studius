import { getUser } from '../../../resources/backend';

type PageProps = {
	params: {
		userId: string;
	};
};

async function SubjectPage(props: PageProps) {
	const todo = await getUser(props.params.userId);

	return (
		<div>
			<p>This is a user page</p>
			<h1>{todo.firstname}</h1>
			<p>{todo.id}</p>
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
// 		return { userId: todo.id.toString() };
// 	});
// }
