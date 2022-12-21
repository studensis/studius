import { RoomRepository } from '../repository/RoomRepository';
import RoomEntity from '../RoomEntity';

export default async function updateRoomInteractor(
    roomRepository: RoomRepository,
    room: RoomEntity
) {
    let updatedRoom = await roomRepository.update(room);
    return updatedRoom;
}
