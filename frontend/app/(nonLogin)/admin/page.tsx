'use client';

import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../components/@studius/PageHeader/PageHeader';
import SectionButton from '../../../components/@studius/SectionButton/SectionButton';

const Sections = () => {
	return (
		<>
			<Stack cols={3} mobileCols={2}>
				<SectionButton
					icon={'users'}
					href={'/user'}
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
	return (
		<>
			<PageStack>
				<PageHeader
					title="Workspace Tools"
					description="A set of tools to help you manage and moderate your workspace."
				/>
				<Sections />
			</PageStack>
		</>
	);
}
