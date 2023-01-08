import { Block } from '../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';

export const LeftPanel = () => {
	return (
		<>
			<div>
				<SectionTop>
					<h2 className="title2">Events</h2>
					<h2 className="button-small text-accent">View all events</h2>
				</SectionTop>
				<Block>
					<span className="title3">May</span>
				</Block>
			</div>
		</>
	);
};
