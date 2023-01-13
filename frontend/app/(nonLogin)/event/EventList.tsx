import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';
import EventModal from './EventModal';

const EventList = () => {
	const events = trpc.event.listEvents.useQuery();
	const { setModal } = useDialog();

	return (
		<div>
			<div>
				{events.isLoading && <Spinner />}
				{events?.data && (
					<Block>
						<Table
							titles={{
								title: 'Title',
								description: 'Description',
								linkedEntity: 'Linked Entity',
							}}
							objects={events.data}
							onClick={(event) => {
								setModal(<EventModal eventId={event.id} />);
							}}
						></Table>
					</Block>
				)}
			</div>
		</div>
	);
};

export default EventList;
