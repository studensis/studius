import SubjectEntity from '../SubjectEntity';

export abstract class SubjectRepository {
	async getAll(): Promise<SubjectEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async create(subject: SubjectEntity): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async update(subject: SubjectEntity): Promise<SubjectEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(subjectId: string): Promise<SubjectEntity>{
		throw new Error('Method not implemented.');
	}
}
