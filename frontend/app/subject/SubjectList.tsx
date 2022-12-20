import Link from 'next/link';
import { Todo } from '../../typings';

const fetchTodos = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/todos/', {
		next: { revalidate: 60 },
	});
	const subjects: Todo[] = await res.json();
	return subjects;
};

async function SubjectList() {
	const subjects = await fetchTodos();

	return (
		<div>
			{subjects.map((subject) => (
				<Link href={'/subject/' + subject.id} key={subject.id}>
					<p>
						[{subject.id}] {subject.title}
					</p>
				</Link>
			))}
		</div>
	);
}

export default SubjectList;
