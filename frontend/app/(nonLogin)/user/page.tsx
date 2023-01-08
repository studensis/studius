'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import UserList from './UserList';

export default function Page() {
	return (
		<>
			<PageStack>
				<h1 className="display2">Users</h1>
				<AdminToolbar />
				<UserList />
			</PageStack>
		</>
	);
}
