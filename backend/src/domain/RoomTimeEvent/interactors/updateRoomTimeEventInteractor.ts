import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';
import RoomTimeEventEntity from '../RoomTimeEventEntity';

export default async function updateRoomTimeEventInteractor(
    roomTimeEventRepository: RoomTimeEventRepository,
    roomTimeEvent: RoomTimeEventEntity
) {
    let updatedRoomTimeEvent = await roomTimeEventRepository.update(roomTimeEvent);
    return updatedRoomTimeEvent;
}
