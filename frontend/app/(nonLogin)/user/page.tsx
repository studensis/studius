'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import UserList from './UserList';

export default function Page() {
	return (
		<>
			<PageStack>
				<PageHeader
					title={'User Management'}
					subtitle={'Workspace Tools'}
					actionRow={<AdminToolbar />}
				/>
				<UserList />
			</PageStack>
		</>
	);
}
