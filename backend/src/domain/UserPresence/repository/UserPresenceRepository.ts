import { Prisma } from '@prisma/client';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { updateUserPresenceEntity } from '../model/updateUserPresenceEntity';
import { UserPresenceEntity } from '../model/UserPresenceEntity';

export abstract class UserPresenceRepository {
	async getAll(): Promise<UserPresenceEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<UserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async create(userPresence: UserPresenceEntity): Promise<UserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		userPresence: updateUserPresenceEntity
	): Promise<UserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(userPresenceId: string): Promise<UserPresenceEntity> {
		throw new Error('Method not implemented.');
	}
	async deleteByScheduleId(ScheduleID: string): Promise<Prisma.BatchPayload> {
		throw new Error('Method not implemented.');
	}
	async getAssociatedSchedule(id: string): Promise<ScheduleEntity> {
		throw new Error('Method not implemented.');
	}
}
