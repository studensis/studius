import EventEntity from '../EventEntity';

export abstract class EventRepository {
	async getAll(): Promise<EventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async create(event: EventEntity): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async update(event: EventEntity): Promise<EventEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(eventId: string): Promise<EventEntity>{
		throw new Error('Method not implemented.');
	}
}
