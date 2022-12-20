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

	async update(subjectData: SubjectEntity) {

		let updatedSubject: any = {};
			if(subjectData.title) updatedSubject["title"] = subjectData.title;
			if(subjectData.description) updatedSubject["description"] = subjectData.description;
			if(subjectData.ectsBod) updatedSubject["ectsBod"] = subjectData.ectsBod;
			if(subjectData.semester) updatedSubject["semester"] = subjectData.semester;
			if(subjectData.status) updatedSubject["status"] = subjectData.status;
			if(subjectData.contentId) updatedSubject["contentId"] = subjectData.contentId;

		
		let updatedData = await prisma.subject.update({
			
			where: {
				id: subjectData.id,
			},
			data: {
				title: updatedSubject.title,
				description: updatedSubject.description,
				ectsBod: updatedSubject.ectsBod,
				semester: updatedSubject.semester,
				status: updatedSubject.status,
				contentId: updatedSubject.contentId,
			},
		});		
		let rez = new SubjectEntity(updatedData);

		return rez;
		
	}

	async getById(id: string) {
		let data = await prisma.subject.findUnique({ where: { id: id } });
		let subject = new SubjectEntity(data);
		return subject;
	}

	async create(subject: SubjectEntity) {
		let response = await prisma.subject.create({
			data: {
				id: subject.id,
				title: subject.title,
				description: subject.description,
				ectsBod: subject.ectsBod,
				semester: subject.semester,
				status: subject.status,
			}
		});

		console.log(response);

		let out = new SubjectEntity(response);
		return out;
	}
	
	async delete(subjectId: string) {
		let response = await prisma.subject.delete({
			where: {
				id: subjectId
			}
		});

		return response;
	}
}
