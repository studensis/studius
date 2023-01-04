'use client';

import PageHeader from '../../components/@studius/PageHeader/PageHeader';
import SectionButton from '../../components/@studius/SectionButton/SectionButton';

export default function AdminTools() {
	return (
		<>
			<div>
				<PageHeader
					title="Workspace Tools"
					description="A set of tools to help you manage and moderate your workspace."
				/>
				<div className="grid w-full grid-cols-1 md:grid-cols-3 gap-2">
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
				</div>
			</div>
		</>
	);
}
