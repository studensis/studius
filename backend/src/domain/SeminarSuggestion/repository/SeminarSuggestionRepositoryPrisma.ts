import { PrismaClient } from '@prisma/client';
import SeminarSuggestionEntity from '../SeminarSuggestionEntity';
import { SeminarSuggestionRepository } from './SeminarSuggestionRepository';

const prisma = new PrismaClient();

export default class SeminarSuggestionRepositoryPrisma extends SeminarSuggestionRepository {
	async getAll() {
		// prisma SeminarSuggestions
		let datas = await prisma.seminarSuggestion.findMany();

		// map to SeminarSuggestionEntities
		let seminarSuggestions: SeminarSuggestionEntity[] = [];
		datas.forEach((data) => {
			let seminarSuggestion = new SeminarSuggestionEntity(data);
			seminarSuggestions.push(seminarSuggestion);
		});

		return seminarSuggestions;
	}

	async getById(id: string) {
		let data = await prisma.seminarSuggestion.findUnique({
			where: { id: id },
		});
		if (data) {
			let seminarSuggestion = new SeminarSuggestionEntity(data);
			return seminarSuggestion;
		} else {
			throw new Error('no data');
		}
	}

	async update(seminarSuggestionData: SeminarSuggestionEntity) {
		let updatedSeminarSuggestion: any = {};

		if (seminarSuggestionData.seminarId)
			updatedSeminarSuggestion['seminarId'] =
				seminarSuggestionData.seminarId;
		if (seminarSuggestionData.subjectId)
			updatedSeminarSuggestion['subjectId'] =
				seminarSuggestionData.subjectId;

		let updatedData = await prisma.seminarSuggestion.update({
			where: {
				id: seminarSuggestionData.id,
			},
			data: {
				seminarId: updatedSeminarSuggestion.seminarId,
				subjectId: updatedSeminarSuggestion.subjectId,
			},
		});
		let rez = new SeminarSuggestionEntity(updatedData);

		return rez;
	}

	async create(seminarSuggestion: SeminarSuggestionEntity) {
		let response = await prisma.seminarSuggestion.create({
			data: {
				id: seminarSuggestion.id,
				seminarId: seminarSuggestion.seminarId,
				subjectId: seminarSuggestion.subjectId,
			},
		});

		console.log(response);

		let out = new SeminarSuggestionEntity(response);
		return out;
	}

	async delete(seminarSuggestionId: string) {
		let response = await prisma.seminarSuggestion.delete({
			where: {
				id: seminarSuggestionId,
			},
		});

		return response;
	}
}
