import { Calendar } from '../../../components/@studius/Calendar/Calendar';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { trpc } from '../../../components/hooks/TrpcProvider';

export const LeftPanel = () => {
	const events = trpc.event.listAllSchedules.useQuery();

	return (
		<>
			<Stack>
				<SectionTop>
					<h2 className="title2">Events</h2>
					<h2 className="button-small text-accent">View all events</h2>
				</SectionTop>
				{events.data ? (
					<Calendar
						events={events.data.map((event) => {
							return {
								title: event.event.title,

								timeDateUnix: new Date(event.dateStart).getTime(),
								id: event.id,
							};
						})}
					/>
				) : (
					<Spinner />
				)}
			</Stack>
		</>
	);
};
