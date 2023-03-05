'use client';

import Image from 'next/image';
import { Button } from '../../../../../components/@studius/Button/Button';
import { Block } from '../../../../../components/@studius/PageElements/Block';
import { Section } from '../../../../../components/@studius/PageElements/Section';
import {
	PageStack,
	Stack,
} from '../../../../../components/@studius/PageElements/Stack';
import PageHeader from '../../../../../components/@studius/PageHeader/PageHeader';
import Protected from '../../../../../components/@studius/Protected/Protected';
import { Spinner } from '../../../../../components/@studius/Spinner/Spinner';
import { trpc } from '../../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		eventId: string;
	};
};

const Event = ({
	roomTimeEvent,
}: {
	roomTimeEvent: {
		eventId: string;
		roomId: string;
		dateStart: string;
		dateEnd: string;
	};
}) => {
	const event = trpc.event.getEventById.useQuery(roomTimeEvent.eventId);
	const room = trpc.room.getRoomById.useQuery(roomTimeEvent.roomId);
	return (
		<>
			<Protected minRole="ADMIN">
				<PageStack>
					<Stack cols={1}>
						<PageHeader
							title={event.data ? event.data.title : <Spinner />}
							subtitle={event.data?.description}
						/>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							<div>
								<Block>
									<div className="flex gap-2">
										<div className="flex flex-col gap-2 flex-1">
											<h3 className="title1">{room.data?.title}</h3>
											<p className="caption text-neutral-strong">Location</p>
										</div>
										<Button
											outline
											leftIcon="notifications"
											onClick={() => {}}
										/>
									</div>
								</Block>
							</div>
							<div>
								<Block>
									<div className="flex gap-2">
										<div className="flex flex-col gap-2 flex-1">
											<h3 className="title1">
												<p className="text-neutral-medium caption">
													{new Date(
														roomTimeEvent.dateStart
													).toLocaleDateString()}
												</p>
												<p>
													{new Date(roomTimeEvent.dateStart)
														.toLocaleTimeString()
														.split(':')
														.reverse()
														.slice(1)
														.reverse()
														.join(':')}
												</p>
												to
												<p className="text-neutral-medium caption">
													{new Date(roomTimeEvent.dateEnd).toLocaleDateString()}
												</p>
												<p>
													{new Date(roomTimeEvent.dateEnd)
														.toLocaleTimeString()
														.split(':')
														.reverse()
														.slice(1)
														.reverse()
														.join(':')}
												</p>
											</h3>
											<p className="caption text-neutral-strong">Time</p>
										</div>
										<Button
											outline
											leftIcon="notifications"
											onClick={() => {}}
										/>
									</div>
								</Block>
							</div>
							<div className="col-span-2 md:col-span-1">
								<Block>
									<div className="flex gap-2">
										<div className="flex flex-col gap-2 flex-1">
											<div className="flex">
												<div className="bg-neutral-medium relative h-9 w-9 overflow-hidden rounded-full border-2 border-section mr-[-12px] z-30">
													<Image
														src={'/assets/FER/logo.png'}
														fill
														style={{ objectFit: 'contain' }}
														alt=""
													/>
												</div>
												<div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-section mr-[-12px] z-20 bg-[#E859FF]"></div>
												<div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-section mr-[-12px] z-10 bg-[#6759FF]"></div>
											</div>
											<p className="caption text-neutral-strong">
												Participants
											</p>
										</div>
										<Button outline rightIcon="dropdownArrow">
											RSVP
										</Button>
									</div>
								</Block>
							</div>
						</div>
					</Stack>
					<Section>
						<div className="flex flex-col gap-10">
							<h3 className="display3">So this is my event</h3>
							<p className="body1 text-neutral-strong">
								Hello this is event, please come.
							</p>
							<h4 className="title1">Main theme</h4>
							<p className="body1 text-neutral-strong">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Molestias illum veniam cupiditate atque earum exercitationem,
								velit iusto obcaecati, dicta labore et numquam aut?
							</p>
							<h4 className="title1">Second theme</h4>
						</div>
					</Section>
				</PageStack>
			</Protected>
		</>
	);
};

export default function SubjectPage(props: PageProps) {
	const roomTimeEvent = trpc.event.getSchedule.useQuery(props.params.eventId);
	return (
		<>
			{roomTimeEvent.data && (
				<Event
					roomTimeEvent={{
						eventId: roomTimeEvent.data.eventId,
						roomId: roomTimeEvent.data.roomId,
						dateStart: roomTimeEvent.data.dateStart,
						dateEnd: roomTimeEvent.data.dateEnd,
					}}
				/>
			)}
		</>
	);
}
