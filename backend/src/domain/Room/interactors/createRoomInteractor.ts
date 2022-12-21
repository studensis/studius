import { RoomRepository } from '../repository/RoomRepository';
import RoomEntity from '../RoomEntity';

export default async function createRoomInteractor(
    roomRepository: RoomRepository,
    room: RoomEntity
) {
    let rooms = await roomRepository.create(room);
    return rooms;
}