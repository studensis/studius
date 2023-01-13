import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function archiveRoomTimeEventInteractor(
	id: string,
	roomTimeEventRepository: RoomTimeEventRepository
) {
	let response = await roomTimeEventRepository.archive(id);
	return response;
}
