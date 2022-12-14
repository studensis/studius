import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import SeminarEntity from '../SeminarEntity';
import { SeminarRepository } from './SeminarRepository';

const prisma = new PrismaClient();

export default class SeminarRepositoryPrisma extends SeminarRepository {
	async getAll() {
		// prisma Users
		let datas = await prisma.seminar.findMany();

		// map to UserEntities
		let users: SeminarEntity[] = [];
		datas.forEach((data) => {
			let user = new SeminarEntity(data);
			users.push(user);
		});

		return users;
	}

	async getById(id: number) {
		let data = await prisma.seminar.findUnique({ where: { id: id } });
		let user = new SeminarEntity(data);
		return user;
	}

	async create(user: SeminarEntity) {
		let response = await prisma.seminar.create({
			data: {
				title: "Progi",
                description: "opis",
                mentorId: 1,
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