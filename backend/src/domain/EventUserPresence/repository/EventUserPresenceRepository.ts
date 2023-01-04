import EventUserPresenceEntity from '../EventUserPresenceEntity';

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
		eventUserPresence: EventUserPresenceEntity
	): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(
		eventUserPresenceId: string
	): Promise<EventUserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
}
