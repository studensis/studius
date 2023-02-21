import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { TextInput } from '../../../../components/@studius/Input/TextInput';
import useDialog from '../../../../components/@studius/Modal/DialogProvider';
import { Block } from '../../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const UpdatePostModal = ({
	room,
}: {
	room: {
		id: string;
		title: string;
		capacity: number;
	};
}) => {
	const updateRoom = trpc.room.updateRoomById.useMutation();

	const [formData, setFormData] = useState<{
		id: string;
		title: string;
		capacity: number;
	}>(room);

	const router = useRouter();
	const { setModal } = useDialog();

	useEffect(() => {
		if (updateRoom.isSuccess) {
			setModal(null);
		}
		console.log(updateRoom.status);
	}, [updateRoom]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Create room</h1>

					{updateRoom.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(updateRoom.data)}</pre>
						</Block>
					)}
					{updateRoom.isError && updateRoom.error.shape && (
						<Block danger>
							<pre>{updateRoom.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'ID'}
								value={room.id}
								onChange={(e) => {
									setFormData({
										...formData,
										id: e.currentTarget.value,
									});
								}}
							/>
							<Stack cols={2}>
								<TextInput
									placeholder={'Title'}
									value={room.title}
									onChange={(e) => {
										setFormData({
											...formData,
											title: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									placeholder={'Capacity'}
									type="number"
									value={room.capacity}
									onChange={(e) => {
										setFormData({
											...formData,
											capacity: Number(e.currentTarget.value),
										});
									}}
								/>
							</Stack>
							<div className="sticky bottom-0 left-0">
								<Button
									onClick={() => {
										console.log(formData);

										updateRoom.mutate({
											id: formData.id,
											title: formData.title,
											capacity: formData.capacity,
										});
									}}
								>
									Update room
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
