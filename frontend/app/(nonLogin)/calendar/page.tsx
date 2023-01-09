'use client';

import Link from 'next/link';
import { Block } from '../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../components/@studius/PageElements/Stack';

export default function Calendar() {
	return (
		<>
			<PageStack>
				<h1 className="title1">Calendar</h1>
				<Block>
					<div className="h-40"></div>
				</Block>
				<h2 className="title1">Today</h2>
				<Stack cols={2}>
					<Link href={'/event/1'}>
						<Block>
							<p className="title2">23. Predavanje</p>
						</Block>
					</Link>
					<Link href={'/event/1'}>
						<Block>
							<p className="title2">23. Predavanje</p>
						</Block>
					</Link>
					<Link href={'/event/1'}>
						<Block>
							<p className="title2">23. Predavanje</p>
						</Block>
					</Link>
				</Stack>
			</PageStack>
		</>
	);
}
