import { RoomRepository } from '../repository/RoomRepository';
import { updateRoomEntity } from '../updateRoomEntity';

export default async function updateRoomInteractor(
	roomRepository: RoomRepository,
	room: updateRoomEntity
) {
	let updatedRoom = await roomRepository.update(room);
	return updatedRoom;
}
