import { PrismaClient } from '@prisma/client';
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

	async getById(id: number) {
		let data = await prisma.seminar.findUnique({ where: { id: id } });
		let seminar = new SeminarEntity(data);
		return seminar;
	}

	async create(seminar: SeminarEntity) {
		let response = await prisma.seminar.create({
			data: {
				title: "Progi",
                description: "opis",
                mentorId: "1",
                type: "Pismeni",
                contentId: "3",
                subjectId: "2",
                userId: '4',

			}
		});

		console.log(response);

		let out = new SeminarEntity(response);
		return out;
	}
}