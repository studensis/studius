import { Calendar } from '../../../components/@studius/Calendar/Calendar';
import { Block } from '../../../components/@studius/PageElements/Block';
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
				<Calendar />
				<Block>
					<span className="title3">Event 1</span>
				</Block>
				<Block>
					<span className="title3">Event 2</span>
				</Block>
				<Block>
					<span className="title3">Event 3</span>
				</Block>
			</Stack>
		</>
	);
};
