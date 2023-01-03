'use client';

import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import UserList from './UserList';

export default function Page() {
	return (
		<>
			<h1 className="display2">Users</h1>
			<AdminToolbar />
			<UserList />
		</>
	);
}
