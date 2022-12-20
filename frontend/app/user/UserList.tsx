import Link from 'next/link';
import { getUsers } from '../../resources/backend';

async function SubjectList() {
	const users = await getUsers();

	return (
		<div className="grid grid-cols-3 gap-4">
			{users.map((user) => {
				return (
					<>
						<Link href={'/user/' + user.id} key={user.id}>
							<div className="p-6 border-light-accent-weak border">
								<p className="title1">{user.firstname}</p>
								<p>{user.id}</p>
							</div>
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
