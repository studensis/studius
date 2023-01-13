'use client';

import Link from 'next/link';
import { Button } from '../../../components/@studius/Button/Button';
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
				<Link href="/admin">
					<Button className="title1 text-black">Back to Workspace tools</Button>
				</Link>
				<UserList />
			</PageStack>
		</>
	);
}
