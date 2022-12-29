import { RoomTimeEventRepository } from '../repository/RoomTimeEventRepository';
import RoomTimeEventEntity from '../RoomTimeEventEntity';

export default async function createRoomTimeEventInteractor(
    roomTimeEventRepository: RoomTimeEventRepository,
    roomTimeEvent: RoomTimeEventEntity
) {
    let roomTimeEvents = await roomTimeEventRepository.create(roomTimeEvent);
    return roomTimeEvents;
}