'use client';

import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../components/@studius/Protected/Protected';
import SectionButton from '../../../components/@studius/SectionButton/SectionButton';
import useLogin from '../../../components/hooks/LoginContext';

const Sections = () => {
	return (
		<>
			<Stack cols={3} mobileCols={2}>
				<SectionButton
					icon={'users'}
					href={'/admin/user'}
					title={'User Management'}
				/>
				<SectionButton
					icon={'subjects'}
					href={'/subject'}
					title={'Subject Management'}
				/>
				<SectionButton
					href="/event"
					icon={'calendar'}
					title={'Event Management'}
				/>
				<SectionButton icon={'room'} title={'Room Management'} href={'/room'} />
				<SectionButton
					icon={'posts'}
					title={'Post Management'}
					href={'/post'}
				/>
				{/* <SectionButton icon={'lessons'} title={'Seminar Management'} disabled /> */}
			</Stack>
		</>
	);
};
export default function AdminTools() {
	const { user, loggedIn } = useLogin();
	return (
		<>
			<Protected
				subjectId="a476e67a-20c8-41f2-aeda-6c14cf1888c9"
				minRole={'ADMIN'}
				displayMessage
			>
				<PageStack>
					<PageHeader
						title="Workspace Tools"
						description="A set of tools to help you manage and moderate your workspace."
					/>
					<Sections />
				</PageStack>
			</Protected>
		</>
	);
}
