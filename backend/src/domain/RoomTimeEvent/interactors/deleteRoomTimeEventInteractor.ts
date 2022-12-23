import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function deleteRoomTimeEventInteractor(
    id: string, 
    roomTimeEventRepository: RoomTimeEventRepository
) {
    let response = await roomTimeEventRepository.delete(id);
    return response;
}