'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import SubjectList from './SubjectList';

function Page() {
	return (
		<>
			<PageStack>
				<h1 className="display2">Subjects</h1>
				<SubjectList />
			</PageStack>
		</>
	);
}

export default Page;
