'use client';

import Link from 'next/link';
import { Button } from '../../../components/@studius/Button/Button';
import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import AdminToolbar from './AdminToolbar';
// import AdminToolbar from './AdminToolbar';
import RoomList from './RoomList';

export default function Page() {
	return (
		<>
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
		</>
	);
}
