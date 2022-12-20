import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import SeminarEntity from '../SeminarEntity';
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
		let seminar = new SeminarEntity(data);
		return seminar;
	}

	async update(seminarData: SeminarEntity) {

		let updatedSeminar: any = {};


			if(seminarData.description) updatedSeminar["description"] = seminarData.description;
			if(seminarData.mentorId) updatedSeminar["mentorId"] = seminarData.mentorId;
			if(seminarData.type) updatedSeminar["type"] = seminarData.type;
			if(seminarData.contentId) updatedSeminar["contentId"] = seminarData.contentId;
			if(seminarData.subjectId) updatedSeminar["subjectId"] = seminarData.subjectId;
			if(seminarData.userId) updatedSeminar["userId"] = seminarData.userId;
		
		let updatedData = await prisma.seminar.update({
			
			where: {
				title: seminarData.title,
			},
			data: {
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
		console.log('Hary je tu')
		let response = await prisma.seminar.create({
			data: {
				title: seminar.title,
                description: seminar.description,
                mentorId: seminar.mentorId,
                type: seminar.type,
                contentId: seminar.contentId,
                subjectId: seminar.subjectId
			}
		});
		console.log('Hary proso')

		console.log(response);

		let out = new SeminarEntity(response);
		return out;
	}
}