import { updateRoomEntity } from '../model/updateRoomEntity';
import { RoomRepository } from '../repository/RoomRepository';

export default async function updateRoomInteractor(
	roomRepository: RoomRepository,
	room: updateRoomEntity
) {
	let updatedRoom = await roomRepository.update(room);
	return updatedRoom;
}
