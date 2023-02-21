'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../components/@studius/Protected/Protected';
import SubjectList from './SubjectList';

function Page() {
	return (
		<>
			<Protected minRole={'DEFAULT'} displayMessage>
				<PageStack>
					<PageHeader title={'Subjects'} />

					<SubjectList />
				</PageStack>
			</Protected>
		</>
	);
}

export default Page;
