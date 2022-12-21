import { RoomRepository } from '../repository/RoomRepository';

export default async function listRoomsInteractor(
    roomRepository: RoomRepository
) {
    let rooms = await roomRepository.getAll();
    return rooms
}