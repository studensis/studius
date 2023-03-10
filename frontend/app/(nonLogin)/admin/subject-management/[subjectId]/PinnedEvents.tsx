'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Icon from '../../../../../components/@studius/Icon/Icon';
import { Block } from '../../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../../components/hooks/TrpcProvider';

export const PinnedSchedules = ({ subjectId }: { subjectId: string }) => {
	const events = trpc.subject.getPinnedSchedules.useQuery(subjectId);
	useEffect(() => {
		console.log(events.data);
	}, [events]);
	return (
		<>
			{events.data && events.data.length > 0 && (
				<>
					<div>
						<SectionTop>
							<h3 className="title2 flex gap-1">
								<Icon icon="calendar" /> Pinned Events
							</h3>
						</SectionTop>
						<Stack cols={3}>
							{events.data.map((event) => (
								<>
									<Link href={`/event/${event.scheduleId}`}>
										<Block className="hover:opacity-60">
											<p className="title3">{event.schedule.id}</p>
											<p className="body3 text-neutral-strong">{event.id}</p>
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
