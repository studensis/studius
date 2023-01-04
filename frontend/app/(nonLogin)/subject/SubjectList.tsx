import Link from 'next/link';
import { trpc } from '../../components/hooks/TrpcProvider';

// const fetchTodos = async () => {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/todos/', {
// 		next: { revalidate: 60 },
// 	});
// 	const subjects: Todo[] = await res.json();
// 	return subjects;
// };

async function SubjectList() {
	const subjects = trpc.subject.listSubjects.useQuery();

	return (
		<div>
			{subjects?.map((subject: { id: string; title: any }) => (
				<Link href={'/subject/' + subject?.id} key={subject?.id}>
					<p>
						[{subject?.id}] {subject?.title}
					</p>
				</Link>
			))}
		</div>
	);
}

export default SubjectList;
