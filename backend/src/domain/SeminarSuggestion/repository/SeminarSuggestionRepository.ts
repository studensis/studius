import SeminarSuggestionEntity from '../SeminarSuggestionEntity'

export abstract class SeminarSuggestionRepository {
	async getAll(): Promise<SeminarSuggestionEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async create(SeminarSuggestion: SeminarSuggestionEntity): Promise<SeminarSuggestionEntity> {
		throw new Error('Method not implemented.');
	}
	async update(seminarSuggestion: SeminarSuggestionEntity): Promise<SeminarSuggestionEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(seminarSuggestionId: string): Promise<SeminarSuggestionEntity>{
		throw new Error('Method not implemented.');
	}
}