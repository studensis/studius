import { PrismaClient } from '@prisma/client';
import { RoomEntity } from '../../Room/model/RoomEntity';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { PinnedScheduleEntity } from '../model/PinnedScheduleEntity';
import { updatePinnedScheduleEntity } from '../model/updatePinnedScheduleEntity';
import { PinnedScheduleRepository } from './PinnedScheduleRepository';

const prisma = new PrismaClient();

export default class PinnedScheduleRepositoryPrisma extends PinnedScheduleRepository {
	async getAll() {
		// prisma PinnedSchedules
		let datas = await prisma.pinnedSchedule.findMany();

		// map to PinnedScheduleEntities
		let pinnedSchedules: PinnedScheduleEntity[] = [];
		datas.forEach((data: PinnedScheduleEntity) => {
			let pinnedSchedule: PinnedScheduleEntity = data;
			pinnedSchedules.push(pinnedSchedule);
		});

		return pinnedSchedules;
	}

	async getById(id: string) {
		let data = await prisma.pinnedSchedule.findUnique({
			where: { id: id },
		});
		if (data) {
			let pinnedSchedule: PinnedScheduleEntity = data;
			return pinnedSchedule;
		} else {
			throw new Error('no data');
		}
	}

	async update(pinnedScheduleData: updatePinnedScheduleEntity) {
		let updatedData = await prisma.pinnedSchedule.update({
			where: {
				id: pinnedScheduleData.id,
			},
			data: {
				scheduleId: pinnedScheduleData.scheduleId,
				subjectId: pinnedScheduleData.subjectId,
			},
		});
		let rez: PinnedScheduleEntity = updatedData;

		return rez;
	}

	async create(pinnedSchedule: PinnedScheduleEntity) {
		let response = await prisma.pinnedSchedule.create({
			data: {
				scheduleId: pinnedSchedule.scheduleId,
				subjectId: pinnedSchedule.subjectId,
			},
		});

		console.log(response);

		let out: PinnedScheduleEntity = response;
		return out;
	}

	async delete(pinnedScheduleId: string) {
		let response = await prisma.pinnedSchedule.delete({
			where: {
				id: pinnedScheduleId,
			},
		});

		return response;
	}

	async getBySubjectId(subjectId: string) {
		let datas = await prisma.pinnedSchedule.findMany({
			where: { subjectId: subjectId },
			include: {
				schedule: {
					include: {
						room: true,
					},
				},
			},
		});
		let pinnedSchedules: (PinnedScheduleEntity & {
			schedule: ScheduleEntity & { room: RoomEntity };
		})[] = [];
		if (datas) {
			datas.forEach((data) => {
				let pinnedSchedule = data;
				pinnedSchedules.push(pinnedSchedule);
			});
			return pinnedSchedules;
		} else {
			throw new Error('no data');
		}
	}

	async deleteByScheduleId(scheduleId: string) {
		let response = await prisma.pinnedSchedule.deleteMany({
			where: {
				scheduleId: scheduleId,
			},
		});

		return response;
	}

	async deleteBySubjectId(subjectId: string) {
		let response = await prisma.pinnedSchedule.deleteMany({
			where: {
				subjectId: subjectId,
			},
		});

		return response;
	}
}
