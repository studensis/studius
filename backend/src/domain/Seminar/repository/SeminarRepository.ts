import SeminarEntity from '../SeminarEntity'

export abstract class SeminarRepository {
	async getAll(): Promise<SeminarEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: number): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async create(Seminar: SeminarEntity): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
}