import { PrismaClient } from '@prisma/client';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { updateUserPresenceEntity } from '../model/updateUserPresenceEntity';
import { UserPresenceEntity } from '../model/UserPresenceEntity';
import { UserPresenceRepository } from './UserPresenceRepository';

const prisma = new PrismaClient();

export default class UserPresenceRepositoryPrisma extends UserPresenceRepository {
	async getAll() {
		// prisma UserPresences
		let datas = await prisma.userPresence.findMany();

		// map to UserPresenceEntities
		let userPresences: UserPresenceEntity[] = [];
		datas.forEach((data: UserPresenceEntity) => {
			let userPresence: UserPresenceEntity = data;
			userPresences.push(userPresence);
		});

		return userPresences;
	}

	async getById(id: string) {
		let data = await prisma.userPresence.findUnique({
			where: { id: id },
		});
		if (data) {
			let userPresence: UserPresenceEntity = data;
			return userPresence;
		} else {
			throw new Error('no data');
		}
	}

	async update(userPresenceData: updateUserPresenceEntity) {
		let updatedData = await prisma.userPresence.update({
			where: {
				id: userPresenceData.id,
			},
			data: {
				presenceStatus: userPresenceData.presenceStatus,
			},
		});
		let rez: UserPresenceEntity = updatedData;

		return rez;
	}

	async create(userPresence: UserPresenceEntity) {
		let response = await prisma.userPresence.create({
			data: {
				presenceStatus: userPresence.presenceStatus,
				scheduleId: userPresence.scheduleId,
				userId: userPresence.userId,
			},
		});

		console.log(response);

		let out: UserPresenceEntity = response;
		return out;
	}

	async delete(userPresenceId: string) {
		let response = await prisma.userPresence.delete({
			where: {
				id: userPresenceId,
			},
		});

		return response;
	}

	async deleteByScheduleID(ScheduleID: string) {
		let response = await prisma.userPresence.deleteMany({
			where: {
				scheduleId: ScheduleID,
			},
		});

		return response;
	}

	async getAssociatedSchedule(id: string) {
		let userPresence = await prisma.userPresence.findUnique({
			where: { id: id },
			select: {
				schedule: true,
			},
		});

		let schedule: ScheduleEntity;

		if (userPresence) {
			schedule = userPresence.schedule;
			if (schedule) {
				return schedule;
			} else {
				throw new Error('no data');
			}
		} else {
			throw new Error('no data');
		}
	}
}
