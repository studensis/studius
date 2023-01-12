import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import { EventUserPresenceEntity } from '../model/EventUserPresenceEntity';
import { updateEventUserPresenceEntity } from '../model/updateEventUserPresenceEntity';

export abstract class EventUserPresenceRepository {
	async getAll(): Promise<EventUserPresenceEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async create(
		eventUserPresence: EventUserPresenceEntity
	): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		eventUserPresence: updateEventUserPresenceEntity
	): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(eventUserPresenceId: string): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async deleteByRTEID(RTEID: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	async getAssociatedRoomTimeEvent(id: string): Promise<RoomTimeEventEntity> {
		throw new Error('Method not implemented.');
	}
}
