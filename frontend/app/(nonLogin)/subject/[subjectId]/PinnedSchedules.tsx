'use client';

import Link from 'next/link';
import Icon from '../../../../components/@studius/Icon/Icon';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const PinnedSchedules = ({ subjectId }: { subjectId: string }) => {
	const pinnedSchedules = trpc.subject.getPinnedSchedules.useQuery(subjectId);

	const getTimeString = (s: string) => {
		let date: Date = new Date(s);
		return date.toLocaleTimeString();
	};
	const getDateString = (s: string) => {
		let date: Date = new Date(s);
		return date.toLocaleDateString();
	};

	return (
		<>
			{pinnedSchedules.data && pinnedSchedules.data.length > 0 && (
				<>
					<div>
						<SectionTop>
							<h3 className="title2 flex gap-1">
								<Icon icon="calendar" /> Pinned Events
							</h3>
						</SectionTop>
						<Stack cols={3}>
							{pinnedSchedules.data.map((pinnedSchedule) => (
								<>
									<Link href={`/event/${pinnedSchedule.scheduleId}`}>
										<Block className="hover:opacity-60">
											<p className="title3">
												{pinnedSchedule.schedule.room.title}
											</p>
											<br></br>
											<p className="body3 text-neutral-strong">
												{getTimeString(pinnedSchedule.schedule.dateStart)}
											</p>
											<p className="body3 text-neutral-strong">
												{getDateString(pinnedSchedule.schedule.dateStart)}
											</p>
											<br></br>
											<p className="body3 text-neutral-strong">
												{getTimeString(pinnedSchedule.schedule.dateEnd)}
											</p>
											<p className="body3 text-neutral-strong">
												{getDateString(pinnedSchedule.schedule.dateEnd)}
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
