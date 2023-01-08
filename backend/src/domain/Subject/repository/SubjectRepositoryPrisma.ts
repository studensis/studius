import { PrismaClient } from '@prisma/client';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import { SubjectRepository } from './SubjectRepository';

const prisma = new PrismaClient();

export default class SubjectRepositoryPrisma extends SubjectRepository {
	async getAll() {
		// prisma Subjects
		let datas = await prisma.subject.findMany();

		// map to SubjectEntities
		let subjects: SubjectEntity[] = [];
		datas.forEach((data: any) => {
			let subject: SubjectEntity = data;
			subjects.push(subject);
		});

		return subjects;
	}

	async update(subjectData: updateSubjectEntity) {
		let updatedData = await prisma.subject.update({
			where: {
				id: subjectData.id,
			},
			data: {
				title: subjectData.title ? subjectData.title : undefined,
				description: subjectData.description
					? subjectData.description
					: undefined,
				ectsBod: subjectData.ectsBod ? subjectData.ectsBod : undefined,
				semester: subjectData.semester ? subjectData.semester : undefined,
				status: subjectData.status ? subjectData.status : undefined,
				contentId: subjectData.contentId ? subjectData.contentId : undefined,
			},
		});
		let rez: SubjectEntity = updatedData;

		return rez;
	}

	async getById(id: string) {
		let data = await prisma.subject.findUnique({ where: { id: id } });
		if (data) {
			let subject: SubjectEntity = data;
			return subject;
		} else {
			return null;
		}
	}

	async create(subject: SubjectEntity) {
		let response = await prisma.subject.create({
			data: {
				title: subject.title,
				description: subject.description,
				ectsBod: subject.ectsBod,
				semester: subject.semester,
				status: subject.status,
				contentId: subject.contentId,
			},
		});

		console.log(response);

		let out: SubjectEntity = response;
		return out;
	}

	async delete(subjectId: string) {
		let response = await prisma.subject.delete({
			where: {
				id: subjectId,
			},
		});

		let out: SubjectEntity = response;
		return out;
	}

	async addContent(id: string, contentId: string[]) {
		let updatedData = await prisma.subject.update({
			where: {
				id: id,
			},
			data: {
				contentId: {
					push: contentId,
				},
			},
		});
		let rez: SubjectEntity = updatedData;

		return rez;
	}

	async isUserEditor(subjectId: string, userId: string) {
		let users = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				status: 'ACTIVE',
			},
			include: {
				user: true,
			},
		});

		let user = users.filter(
			(user) =>
				user.userId === userId &&
				['PROFESSOR', 'OWNER'].includes(user.roleTitle)
		);

		return user.length >= 1;
	}

	async getEnrolledUsers(subjectId: string) {
		let users = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				status: 'ACTIVE',
			},
			include: {
				user: true,
			},
		});

		return users;
	}
}
