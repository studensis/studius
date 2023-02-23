import { PrismaClient } from '@prisma/client';
import { EventEntity } from '../../Event/model/EventEntity';
import { paginationType } from '../../pagination/paginationObj';
import { UserPresenceEntity } from '../../UserPresence/model/UserPresenceEntity';
import { ScheduleEntity } from '../model/ScheduleEntity';
import { updateScheduleEntity } from '../model/updateScheduleEntity';
import { ScheduleRepository } from './ScheduleRepository';

const prisma = new PrismaClient();

export default class ScheduleRepositoryPrisma extends ScheduleRepository {
	async getAll() {
		// prisma Schedules
		let datas = await prisma.schedule.findMany({
			include: { event: true },
		});

		// map to ScheduleEntities
		let schedules: (ScheduleEntity & { event: EventEntity })[] = [];
		datas.forEach((data) => {
			let schedule = data;
			schedules.push(schedule);
		});

		return schedules;
	}
	async listPaginated(paginationInfo: paginationType) {
		// prisma Schedules
		let datas = await prisma.schedule.findMany({
			include: { event: true },
		});

		// map to ScheduleEntities
		let schedules: (ScheduleEntity & { event: EventEntity })[] = [];
		datas.forEach((data) => {
			let schedule = data;
			schedules.push(schedule);
		});

		return schedules;
	}

	async getById(id: string) {
		let data = await prisma.schedule.findUnique({
			where: { id: id },
		});
		if (data) {
			let schedule: ScheduleEntity = data;
			return schedule;
		} else {
			throw new Error('no data');
		}
	}

	async update(scheduleData: updateScheduleEntity) {
		let updatedData = await prisma.schedule.update({
			where: {
				id: scheduleData.id,
			},
			data: {
				dateStart: scheduleData.dateStart ? scheduleData.dateStart : undefined,
				dateEnd: scheduleData.dateEnd ? scheduleData.dateEnd : undefined,
				eventId: scheduleData.eventId ? scheduleData.eventId : undefined,
				roomId: scheduleData.roomId ? scheduleData.roomId : undefined,
				status: scheduleData.status ? scheduleData.status : undefined,
			},
		});
		let rez: ScheduleEntity = updatedData;

		return rez;
	}

	async create(scheduleData: ScheduleEntity) {
		let response = await prisma.schedule.create({
			data: {
				dateStart: scheduleData.dateStart,
				dateEnd: scheduleData.dateEnd,
				eventId: scheduleData.eventId,
				roomId: scheduleData.roomId,
				status: scheduleData.status,
			},
		});

		console.log(response);

		let out: ScheduleEntity = response;
		return out;
	}

	async delete(scheduleId: string) {
		let response = await prisma.schedule.delete({
			where: {
				id: scheduleId,
			},
		});

		return response;
	}

	async archive(scheduleId: string) {
		let response = await prisma.schedule.update({
			where: {
				id: scheduleId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		return response;
	}

	async archiveByEventId(eventId: string) {
		let response = await prisma.schedule.updateMany({
			where: {
				eventId: eventId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		return response;
	}

	async deleteByEventId(eventId: string) {
		let response = await prisma.schedule.deleteMany({
			where: {
				eventId: eventId,
			},
		});

		return response;
	}

	async deleteByRoomId(roomId: string) {
		let response = await prisma.schedule.deleteMany({
			where: {
				roomId: roomId,
			},
		});

		return response;
	}

	async listAssociatedUserPresences(id: string) {
		// prisma Schedules
		let data = await prisma.schedule.findUnique({
			where: { id: id },
			select: {
				UserPresence: true,
			},
		});

		if (data) {
			let datas: UserPresenceEntity[] = [];
			data.UserPresence.forEach((data: UserPresenceEntity) => {
				let userPresence: UserPresenceEntity = data;
				datas.push(userPresence);
			});

			return datas;
		} else {
			throw new Error('no data');
		}
	}
}
