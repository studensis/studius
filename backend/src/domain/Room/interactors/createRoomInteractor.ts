import { RoomEntity } from '../model/RoomEntity';
import { RoomRepository } from '../repository/RoomRepository';

export default async function createRoomInteractor(
	roomRepository: RoomRepository,
	room: RoomEntity
) {
	let rooms = await roomRepository.create(room);
	return rooms;
}
