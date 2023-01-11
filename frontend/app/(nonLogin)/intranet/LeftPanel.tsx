import { Calendar } from '../../../components/@studius/Calendar/Calendar';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../components/@studius/PageElements/Stack';

export const LeftPanel = () => {
	return (
		<>
			<Stack>
				<SectionTop>
					<h2 className="title2">Events</h2>
					<h2 className="button-small text-accent">View all events</h2>
				</SectionTop>
				<Calendar
					events={[
						{ title: 'TestEvent1', timeDateUnix: new Date().getTime() },
						{
							title: 'TestEvent2',
							timeDateUnix: new Date().getTime() + 1000 * 60 * 60 * 24 * 2,
						},
						{
							title: 'TestEvent0',
							timeDateUnix: new Date().getTime() - 1000 * 60 * 60 * 24 * 7,
						},
					]}
				/>
			</Stack>
		</>
	);
};
