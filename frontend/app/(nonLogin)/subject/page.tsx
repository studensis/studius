'use client';

import Link from 'next/link';
import { Button } from '../../../components/@studius/Button/Button';
import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import AdminToolbar from './AdminToolbar';
import SubjectList from './SubjectList';

function Page() {
	return (
		<>
			<Link className="" href="/admin">
				<Button className="title1 text-black my-4">
					Back to Workspace tools
				</Button>
			</Link>
			<PageStack>
				<PageHeader
					title={'Subject Management'}
					subtitle={'Workspace Tools'}
					actionRow={<AdminToolbar />}
				/>

				<SubjectList />
			</PageStack>
		</>
	);
}

export default Page;
