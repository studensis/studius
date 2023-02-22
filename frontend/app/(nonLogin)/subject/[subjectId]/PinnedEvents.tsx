'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Icon from '../../../../components/@studius/Icon/Icon';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const PinnedEvents = ({ subjectId }: { subjectId: string }) => {
	const pinnedEvents = trpc.subject.getPinnedEvents.useQuery(subjectId);
	useEffect(() => {
		console.log(pinnedEvents.data);
	}, [pinnedEvents]);
	return (
		<>
			{pinnedEvents.data && pinnedEvents.data.length > 0 && (
				<>
					<div>
						<SectionTop>
							<h3 className="title2 flex gap-1">
								<Icon icon="calendar" /> Pinned Events
							</h3>
						</SectionTop>
						<Stack cols={3}>
							{pinnedEvents.data.map((pinnedEvent) => (
								<>
									<Link href={`/event/${pinnedEvent.eventId}`}>
										<Block className="hover:opacity-60">
											<p className="title3">{pinnedEvent.event.title}</p>
											<p className="body3 text-neutral-strong">
												{pinnedEvent.id}
											</p>
										</Block>
									</Link>
								</>
							))}
						</Stack>
					</div>
				</>
			)}
		</>
	);
};
