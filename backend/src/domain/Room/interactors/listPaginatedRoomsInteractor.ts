import { paginationType } from '../../pagination/paginationObj';
import { RoomRepository } from '../repository/RoomRepository';

export default async function listRoomsInteractor(
	roomRepository: RoomRepository,
	paginationInfo: paginationType
) {
	let rooms = await roomRepository.listPaginated(paginationInfo);
	return rooms;
}
