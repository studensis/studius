import { PrismaClient } from '@prisma/client';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import { updateSeminarSuggestionEntity } from '../model/updateSeminarSuggestionEntity';
import { SeminarSuggestionRepository } from './SeminarSuggestionRepository';

const prisma = new PrismaClient();

export default class SeminarSuggestionRepositoryPrisma extends SeminarSuggestionRepository {
	async getAll() {
		// prisma SeminarSuggestions
		let datas = await prisma.pinnedEvent.findMany();

		// map to SeminarSuggestionEntities
		let seminarSuggestions: SeminarSuggestionEntity[] = [];
		datas.forEach((data: SeminarSuggestionEntity) => {
			let seminarSuggestion: SeminarSuggestionEntity = data;
			seminarSuggestions.push(seminarSuggestion);
		});

		return seminarSuggestions;
	}

	async getById(id: string) {
		let data = await prisma.pinnedEvent.findUnique({
			where: { id: id },
		});
		if (data) {
			let seminarSuggestion: SeminarSuggestionEntity = data;
			return seminarSuggestion;
		} else {
			throw new Error('no data');
		}
	}

	async update(seminarSuggestionData: updateSeminarSuggestionEntity) {
		let updatedData = await prisma.pinnedEvent.update({
			where: {
				id: seminarSuggestionData.id,
			},
			data: {
				eventId: seminarSuggestionData.eventId,
				subjectId: seminarSuggestionData.subjectId,
			},
		});
		let rez: SeminarSuggestionEntity = updatedData;

		return rez;
	}

	async create(seminarSuggestion: SeminarSuggestionEntity) {
		let response = await prisma.pinnedEvent.create({
			data: {
				eventId: seminarSuggestion.eventId,
				subjectId: seminarSuggestion.subjectId,
			},
		});

		console.log(response);

		let out: SeminarSuggestionEntity = response;
		return out;
	}

	async delete(seminarSuggestionId: string) {
		let response = await prisma.pinnedEvent.delete({
			where: {
				id: seminarSuggestionId,
			},
		});

		return response;
	}
}
