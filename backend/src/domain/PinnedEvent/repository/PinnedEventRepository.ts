import { Prisma } from '@prisma/client';
import { PinnedEventEntity } from '../model/PinnedEventEntity';
import { updatePinnedEventEntity } from '../model/updatePinnedEventEntity';

export abstract class PinnedEventRepository {
	async getAll(): Promise<PinnedEventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<PinnedEventEntity> {
		throw new Error('Method not implemented.');
	}
	async create(pinnedEvent: PinnedEventEntity): Promise<PinnedEventEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		pinnedEvent: updatePinnedEventEntity
	): Promise<PinnedEventEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(pinnedEventId: string): Promise<PinnedEventEntity> {
		throw new Error('Method not implemented.');
	}
	async getBySubjectId(subjectId: string): Promise<PinnedEventEntity[]> {
		throw new Error('Method not implemented.');
	}
	async deleteByEventId(eventId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async deleteBySubjectId(subjectId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
}
