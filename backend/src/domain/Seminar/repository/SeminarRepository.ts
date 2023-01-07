import SeminarEntity from '../model/SeminarEntity';

export abstract class SeminarRepository {
	async getAll(): Promise<SeminarEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async create(seminar: SeminarEntity): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async update(seminar: SeminarEntity): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(seminarId: string): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
}
