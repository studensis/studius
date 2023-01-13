'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import RoomList from './RoomList';

export default function Page() {
	return (
		<>
			<PageStack>
				<PageHeader
					title={'Post Management'}
					subtitle={'Workspace Tools'}
					actionRow={<AdminToolbar />}
				/>
				<RoomList />
			</PageStack>
		</>
	);
}
