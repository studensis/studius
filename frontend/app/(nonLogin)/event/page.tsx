'use client';
import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../components/@studius/Protected/Protected';
import EventList from './EventList';

const page = () => {
	return (
		<>
			<Protected minRole={'DEFAULT'} displayMessage>
				<PageStack>
					<PageHeader title={'All Events'} />
					<EventList />;
				</PageStack>
			</Protected>
		</>
	);
};

export default page;
