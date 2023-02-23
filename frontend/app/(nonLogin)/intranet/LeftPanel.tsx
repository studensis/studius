import { Calendar } from '../../../components/@studius/Calendar/Calendar';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';
import LoadingCalendar from './loadingCalendar';

export const LeftPanel = () => {
	const events = trpc.event.listAllSchedules.useQuery({
		pageNumber: 1,
		objectsPerPage: 12,
	});

	return (
		<>
			<Stack>
				<SectionTop>
					<h2 className="title2">Events</h2>
					<h2 className="button-small text-accent">View all events</h2>
				</SectionTop>
				{events.data ? (
					<Calendar
						events={events.data.map(
							(event: {
								event: { title: any };
								dateStart: string | number | Date;
								id: any;
							}) => {
								return {
									title: event.event.title,
									timeDateUnix: new Date(event.dateStart).getTime(),
									id: event.id,
								};
							}
						)}
					/>
				) : (
					<LoadingCalendar />
				)}
				<LoadingCalendar />
			</Stack>
		</>
	);
};
