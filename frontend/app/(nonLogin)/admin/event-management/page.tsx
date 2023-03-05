'use client';
import Link from 'next/link';
import { Button } from '../../../../components/@studius/Button/Button';
import { PageStack } from '../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../../components/@studius/Protected/Protected';
import EventList from './EventList';

const page = () => {
	return (
		<>
			<Protected minRole="ADMIN" displayMessage>
				<PageStack>
					<Link href="/admin">
						<Button>Back to Workspace tools</Button>
					</Link>
					<PageHeader title={'Event Management'} subtitle={'Workspace Tools'} />
					<EventList />;
				</PageStack>
			</Protected>
		</>
	);
};

export default page;
