import { RoomRepository } from '../repository/RoomRepository';

export default async function deleteRoomInteractor(
    id: string, 
    roomRepository: RoomRepository
) {
    let response = await roomRepository.delete(id);
    return response;
}