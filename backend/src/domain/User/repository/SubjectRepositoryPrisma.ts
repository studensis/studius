import { PrismaClient } from '@prisma/client';
import SubjectEntity from '../SubjectEntity';
import { SubjectRepository } from './SubjectRepository';

const prisma = new PrismaClient();

export default class SubjectRepositoryPrisma extends SubjectRepository {
	async getAll() {
		// prisma Subjects
		let datas = await prisma.subject.findMany();

		// map to SubjectEntities
		let subjects: SubjectEntity[] = [];
		datas.forEach((data) => {
			let subject = new SubjectEntity(data);
			subjects.push(subject);
		});

		return subjects;
	}

	async getById(id: number) {
		let data = await prisma.subject.findUnique({ where: { id: id } });
		let subject = new SubjectEntity(data);
		return subject;
	}

	async create(subject: SubjectEntity) {
		let response = await prisma.subject.create({
			data: {
				title: 'tit',
				description: 'hehe',
				semester: '1',
				status: 'srk',
				content: 'NGHH'
			}
		});

		console.log(response);

		let out = new SubjectEntity(response);
		return out;
	}
}
