import SubjectEntity from '../SubjectEntity';

export abstract class SubjectRepository {
	async getAll(): Promise<SubjectEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: number): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async create(subject: SubjectEntity): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
}
