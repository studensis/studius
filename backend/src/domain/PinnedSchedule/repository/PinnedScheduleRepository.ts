import { Prisma } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
import { RoomEntity } from '../../Room/model/RoomEntity';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { PinnedScheduleEntity } from '../model/PinnedScheduleEntity';
import { updatePinnedScheduleEntity } from '../model/updatePinnedScheduleEntity';

export abstract class PinnedScheduleRepository {
	async getAll(): Promise<PinnedScheduleEntity[]> {
		throw new Error('Method not implemented.');
	}
	async listPaginated(
		paginationInfo: paginationType
	): Promise<PinnedScheduleEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<PinnedScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async create(
		pinnedSchedule: PinnedScheduleEntity
	): Promise<PinnedScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		pinnedSchedule: updatePinnedScheduleEntity
	): Promise<PinnedScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(pinnedScheduleId: string): Promise<PinnedScheduleEntity> {
		throw new Error('Method not implemented.');
	}
	async getBySubjectId(subjectId: string): Promise<
		(PinnedScheduleEntity & {
			schedule: ScheduleEntity & { room: RoomEntity };
		})[]
	> {
		throw new Error('Method not implemented.');
	}
	async deleteByScheduleId(scheduleId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async deleteBySubjectId(subjectId: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
}
