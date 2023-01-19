import { EventEntity } from '../../Event/model/EventEntity';
import { SeminarSuggestionEntity } from '../model/SeminarSuggestionEntity';
import { updateSeminarSuggestionEntity } from '../model/updateSeminarSuggestionEntity';

export abstract class SeminarSuggestionRepository {
	async getAll(): Promise<SeminarSuggestionEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async create(
		seminarSuggestion: SeminarSuggestionEntity
	): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async update(
		seminarSuggestion: updateSeminarSuggestionEntity
	): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(seminarSuggestionId: string): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async listPinnedEventsBySubjectId(
		subjectId: string
	): Promise<(SeminarSuggestionEntity & { event: EventEntity })[]> {
		throw new Error('Method not implemented.');
	}
}
