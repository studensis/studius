import { RoomRepository } from '../repository/RoomRepository';

export default async function getRoomInteractor(
    roomRepository: RoomRepository,
    id: string
) {
    let rooms = await roomRepository.getById(id);
    return rooms
}
