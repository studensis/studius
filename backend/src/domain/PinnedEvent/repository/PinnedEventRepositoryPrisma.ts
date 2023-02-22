import { PrismaClient } from '@prisma/client';
import { paginationType } from '../../pagination/paginationObj';
import { pinnedScheduleEntity } from '../model/pinnedScheduleEntity';
import { updatepinnedScheduleEntity } from '../model/updatepinnedScheduleEntity';
import { pinnedScheduleRepository } from './pinnedScheduleRepository';

const prisma = new PrismaClient();

export default class pinnedScheduleRepositoryPrisma extends pinnedScheduleRepository {
	async getAll() {
		// prisma pinnedSchedules
		let datas = await prisma.pinnedSchedule.findMany();

		// map to pinnedScheduleEntities
		let pinnedSchedules: pinnedScheduleEntity[] = [];
		datas.forEach((data: pinnedScheduleEntity) => {
			let pinnedSchedule: pinnedScheduleEntity = data;
			pinnedSchedules.push(pinnedSchedule);
		});

		return pinnedSchedules;
	}
	async listPaginated(paginationInfo: paginationType) {
		// prisma pinnedSchedules
		let datas = await prisma.pinnedSchedule.findMany({
			skip: paginationInfo.objectsPerPage * paginationInfo.pageNumber,
			take: paginationInfo.objectsPerPage,
		});

		// map to pinnedScheduleEntities
		let pinnedSchedules: pinnedScheduleEntity[] = [];
		datas.forEach((data: pinnedScheduleEntity) => {
			let pinnedSchedule: pinnedScheduleEntity = data;
			pinnedSchedules.push(pinnedSchedule);
		});

		return pinnedSchedules;
	}

	async getById(id: string) {
		let data = await prisma.pinnedSchedule.findUnique({
			where: { id: id },
		});
		if (data) {
			let pinnedSchedule: pinnedScheduleEntity = data;
			return pinnedSchedule;
		} else {
			throw new Error('no data');
		}
	}

	async update(pinnedScheduleData: updatepinnedScheduleEntity) {
		let updatedData = await prisma.pinnedSchedule.update({
			where: {
				id: pinnedScheduleData.id,
			},
			data: {
				eventId: pinnedScheduleData.eventId,
				subjectId: pinnedScheduleData.subjectId,
			},
		});
		let rez: pinnedScheduleEntity = updatedData;

		return rez;
	}

	async create(pinnedSchedule: pinnedScheduleEntity) {
		let response = await prisma.pinnedSchedule.create({
			data: {
				eventId: pinnedSchedule.eventId,
				subjectId: pinnedSchedule.subjectId,
			},
		});

		console.log(response);

		let out: pinnedScheduleEntity = response;
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
		});
		let pinnedSchedules: pinnedScheduleEntity[] = [];
		if (datas) {
			datas.forEach((data: pinnedScheduleEntity) => {
				let pinnedSchedule: pinnedScheduleEntity = data;
				pinnedSchedules.push(pinnedSchedule);
			});
			return pinnedSchedules;
		} else {
			throw new Error('no data');
		}
	}

	async deleteByEventId(eventId: string) {
		let response = await prisma.pinnedSchedule.deleteMany({
			where: {
				scheduleId: eventId,
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
