'use client';

import Link from 'next/link';
import { Button } from '../../../../components/@studius/Button/Button';
import { PageStack } from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../../components/@studius/Protected/Protected';
import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import RoomList from './RoomList';

export default function Page() {
	return (
		<>
			<Protected minRole={'ADMIN'} displayMessage>
				<PageStack>
					<Link href="/admin">
						<Button>Back to Workspace tools</Button>
					</Link>
					<PageHeader
						title={'Post Management'}
						subtitle={'Workspace Tools'}
						actionRow={<AdminToolbar />}
					/>
					<RoomList />
				</PageStack>
			</Protected>
		</>
	);
}
