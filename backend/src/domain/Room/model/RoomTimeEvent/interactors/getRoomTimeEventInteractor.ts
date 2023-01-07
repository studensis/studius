import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';

export default async function getRoomTimeEventInteractor(
    roomTimeEventRepository: RoomTimeEventRepository,
    id: string
) {
    let roomTimeEvents = await roomTimeEventRepository.getById(id);
    return roomTimeEvents
}
