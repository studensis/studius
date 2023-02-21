import { paginationType } from '../../pagination/paginationObj';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';

export abstract class EventRepository {
	async getAll(paginationInfo: paginationType): Promise<EventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async create(event: EventEntity): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async update(event: updateEventEntity): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(eventId: string): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async archive(eventId: string): Promise<EventEntity> {
		throw new Error('Method not implemented.');
	}
	async listAssociatedSchedules(eventId: string): Promise<ScheduleEntity[]> {
		throw new Error('Method not implemented.');
	}
}
