import Link from 'next/link';
import UserList from './UserList';

async function Page() {
	return (
		<>
			<h1 className="display2">Users</h1>
			<Link href="/user/create">Create</Link>
			{/* @ts-ignore */}
			<UserList />
		</>
	);
}

export default Page;
