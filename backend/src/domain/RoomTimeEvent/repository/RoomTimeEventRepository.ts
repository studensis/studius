import { EventUserPresenceEntity } from '../../EventUserPresence/model/EventUserPresenceEntity';
import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';

export abstract class RoomTimeEventRepository {
	async getAll(): Promise<RoomTimeEventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async create(
		roomTimeEvent: RoomTimeEventEntity
	): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		roomTimeEvent: updateRoomTimeEventEntity
	): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(roomTimeEventId: string): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
	async listAssociatedEventUserPresences(
		id: string
	): Promise<EventUserPresenceEntity[]> {
		throw new Error('Method not implemented.');
	}
	async archive(roomTimeEventId: string): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
}
