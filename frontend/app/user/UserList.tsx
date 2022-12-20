import Link from 'next/link';
import { getUsers } from '../../resources/backend';

async function SubjectList() {
	const users = await getUsers();

	return (
		<div>
			{users.map((user) => {
				return (
					<>
						<Link href={'/user/' + user.id} key={user.id}>
							<p>{user.id}</p>
							<p>{user.firstname}</p>
						</Link>
					</>
				);
			})}
			{/* {subjects.map((subject) => (
				<Link href={'/subject/' + subject.id} key={subject.id}>
					<p>
						[{subject.id}] {subject.title}
					</p>
				</Link>
			))} */}
		</div>
	);
}

export default SubjectList;
