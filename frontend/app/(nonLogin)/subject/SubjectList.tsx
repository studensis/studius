import Link from 'next/link';
import { trpc } from '../../../components/hooks/TrpcProvider';

// const fetchTodos = async () => {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/todos/', {
// 		next: { revalidate: 60 },
// 	});
// 	const subjects: Todo[] = await res.json();
// 	return subjects;
// };

export default function SubjectList() {
	const subjects = trpc.subject.listSubjects.useQuery();

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
			{subjects.data &&
				subjects.data.map((subject) => (
					<Link href={'/subject/' + subject.id} key={subject.id}>
						<div className="p-10 bg-section rounded-3xl">
							<p className="title1">{subject.title}</p>
							<p className="body1">[{subject.description}]</p>
						</div>
					</Link>
				))}
		</div>
	);
}
