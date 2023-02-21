'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../components/@studius/Protected/Protected';
// import AdminToolbar from './AdminToolbar';
import RoomList from './RoomList';

export default function Page() {
	return (
		<>
			<Protected minRole={'DEFAULT'} displayMessage>
				<PageStack>
					<PageHeader title={'Rooms'} />
					<RoomList />
				</PageStack>
			</Protected>
		</>
	);
}
