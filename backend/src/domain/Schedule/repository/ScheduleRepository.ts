import { Prisma } from '@prisma/client';
import { EventEntity } from '../../Event/model/EventEntity';
import { UserPresenceEntity } from '../../UserPresence/model/UserPresenceEntity';
import { ScheduleEntity } from '../model/ScheduleEntity';
import { updateScheduleEntity } from '../model/updateScheduleEntity';

export abstract class ScheduleRepository {
	async getAll(): Promise<(ScheduleEntity & { event: EventEntity })[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async create(schedule: ScheduleEntity): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async update(schedule: updateScheduleEntity): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(scheduleId: string): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async listAssociatedUserPresences(id: string): Promise<UserPresenceEntity[]> {
		throw new Error('Method not implemented.');
	}
	async archive(scheduleId: string): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async archiveByEventId(eventId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async deleteByEventId(eventId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async deleteByRoomId(roomId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async listPaginated(
		paginationInfo: paginationType
	): Promise<(ScheduleEntity & { event: EventEntity })[]> {
		throw new Error('Method not implemented.');
	}
}
