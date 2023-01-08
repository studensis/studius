'use client';

import { PageStack } from '../../../components/@studius/PageElements/Stack';
import AdminToolbar from '../user/AdminToolbar';
import SubjectList from './SubjectList';

function Page() {
	return (
		<>
			<PageStack>
				<h1 className="display2">Subjects</h1>
				<AdminToolbar />
				<SubjectList />
			</PageStack>
		</>
	);
}

export default Page;
