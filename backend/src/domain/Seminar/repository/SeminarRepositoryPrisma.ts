import { PrismaClient } from '@prisma/client';
import SeminarEntity from '../model/SeminarEntity';
import { SeminarRepository } from './SeminarRepository';

const prisma = new PrismaClient();

export default class SeminarRepositoryPrisma extends SeminarRepository {
	async getAll() {
		// prisma Seminars
		let datas = await prisma.seminar.findMany();

		// map to SeminarEntities
		let seminars: SeminarEntity[] = [];
		datas.forEach((data) => {
			let seminar = new SeminarEntity(data);
			seminars.push(seminar);
		});

		return seminars;
	}

	async getById(id: string) {
		let data = await prisma.seminar.findUnique({ where: { id: id } });
		if (data) {
			let seminar = new SeminarEntity(data);
			return seminar;
		} else {
			throw new Error('no data');
		}
	}

	async update(seminarData: SeminarEntity) {
		let updatedSeminar: any = {};

		if (seminarData.title) updatedSeminar['title'] = seminarData.title;
		if (seminarData.description)
			updatedSeminar['description'] = seminarData.description;
		if (seminarData.mentorId)
			updatedSeminar['mentorId'] = seminarData.mentorId;
		if (seminarData.type) updatedSeminar['type'] = seminarData.type;
		if (seminarData.contentId)
			updatedSeminar['contentId'] = seminarData.contentId;
		if (seminarData.subjectId)
			updatedSeminar['subjectId'] = seminarData.subjectId;
		if (seminarData.userId) updatedSeminar['userId'] = seminarData.userId;

		let updatedData = await prisma.seminar.update({
			where: {
				id: seminarData.id,
			},
			data: {
				title: updatedSeminar.title,
				description: updatedSeminar.description,
				mentorId: updatedSeminar.mentorId,
				type: updatedSeminar.type,
				contentId: updatedSeminar.contentId,
				subjectId: updatedSeminar.subjectId,
				userId: updatedSeminar.userId,
			},
		});
		let rez = new SeminarEntity(updatedData);

		return rez;
	}

	async create(seminar: SeminarEntity) {
		let response = await prisma.seminar.create({
			data: {
				id: seminar.id,
				title: seminar.title,
				description: seminar.description,
				mentorId: seminar.mentorId,
				type: seminar.type,
				contentId: seminar.contentId,
				subjectId: seminar.subjectId,
				userId: seminar.userId,
			},
		});

		console.log(response);

		let out = new SeminarEntity(response);
		return out;
	}

	async delete(seminarId: string) {
		let response = await prisma.seminar.delete({
			where: {
				id: seminarId,
			},
		});

		return response;
	}
}
