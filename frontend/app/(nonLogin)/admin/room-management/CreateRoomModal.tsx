import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../../../../components/@studius/Button/Button';
import { TextInput } from '../../../../components/@studius/Input/TextInput';
import { Block } from '../../../../components/@studius/PageElements/Block';
import {
	PageStack,
	Stack,
} from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const CreateRoomModal = () => {
	const createRoom = trpc.room.createRoom.useMutation();

	const [formData, setFormData] = useState<{
		id: string;
		title: string;
		capacity: number;
	}>({
		id: 'uuid()',
		title: 'Room Title',
		capacity: 100,
	});

	const router = useRouter();

	useEffect(() => {
		// if (createRoom.status === 'success') {
		// 	router.push('/user');
		// }
		console.log(createRoom.status);
	}, [createRoom]);

	return (
		<>
			<div className="p-6 md:p-10">
				<PageStack>
					<h1 className="display3">Create User</h1>

					{createRoom.isSuccess && (
						<Block success>
							<pre>{JSON.stringify(createRoom.data)}</pre>
						</Block>
					)}
					{createRoom.isError && createRoom.error.shape && (
						<Block danger>
							<pre>{createRoom.error.shape.message}</pre>
						</Block>
					)}
					<form>
						<Stack>
							<TextInput
								placeholder={'ID'}
								onChange={(e) => {
									setFormData({
										...formData,
										id: e.currentTarget.value,
									});
								}}
								disabled
							/>
							<Stack cols={2}>
								<TextInput
									placeholder={'title'}
									onChange={(e) => {
										setFormData({
											...formData,
											title: e.currentTarget.value,
										});
									}}
								/>
								<TextInput
									type={'number'}
									placeholder={'capacity'}
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

										createRoom.mutate({
											title: formData.title,
											capacity: formData.capacity,
										});
									}}
								>
									Create Room
								</Button>
							</div>
						</Stack>
					</form>
				</PageStack>
			</div>
		</>
	);
};
