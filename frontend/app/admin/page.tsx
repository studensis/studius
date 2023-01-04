'use client';

import Link from 'next/link';
import { Button } from '../../components/@studius/Button/Button';
import PageHeader from '../../components/@studius/PageHeader/PageHeader';

export default function AdminTools() {
	return (
		<>
			<div>
				<PageHeader
					title="Workspace Tools"
					description="A set of tools to help you manage and moderate your workspace."
				/>
				<Link href="/user">
					<Button>Users</Button>
				</Link>
				<Link href="/subject">
					<Button>Subjects</Button>
				</Link>
				<h1>Test</h1>
			</div>
		</>
	);
}
