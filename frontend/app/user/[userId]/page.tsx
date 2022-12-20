import Link from 'next/link';
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
			<Link href="/user">
				<p className="title2 mb-12">{'<-'} back to Users</p>
			</Link>
			<h1 className="display1">{todo.firstname}</h1>
			<pre className=" bg-light-neutral-weak p-8">
				{JSON.stringify(props, null, 2)}
			</pre>
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
