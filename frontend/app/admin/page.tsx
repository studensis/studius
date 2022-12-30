'use client';

import Link from 'next/link';
import { Button } from '../../components/@studius/Button/Button';

export default function AdminTools() {
	return (
		<>
			<div>
				<h1 className="display3"> Workspace Tools </h1>
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
