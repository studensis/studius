import { useRouter } from 'next/navigation';
import useDialog from '../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';

const EventList = () => {
	const events = trpc.event.listEvents.useQuery();
	const { setModal } = useDialog();
	const router = useRouter();

	return (
		<div>
			<div>
				{events.isLoading && <Spinner />}
				{events?.data && (
					<Stack cols={1}>
						<Stack cols={3} mobileCols={1}>
							<Block>
								<p className="caption text-neutral-strong">Number of Events</p>
								<p className="title2 text-neutral">{events.data.length}</p>
							</Block>
						</Stack>
						<Block>
							<Table
								titles={{
									title: 'Title',
									description: 'Description',
									linkedEntity: 'Linked Entity',
								}}
								objects={events.data}
							></Table>
						</Block>
					</Stack>
				)}
			</div>
		</div>
	);
};

export default EventList;
