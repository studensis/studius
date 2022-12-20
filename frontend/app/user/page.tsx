import AdminToolbar from './AdminToolbar';
import UserList from './UserList';

async function Page() {
	return (
		<>
			<h1 className="display2">Users</h1>
			<AdminToolbar />
			{/* @ts-ignore */}
			<UserList />
		</>
	);
}

export default Page;
