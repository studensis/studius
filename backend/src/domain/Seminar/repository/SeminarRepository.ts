import SeminarEntity from '../SeminarEntity'

export abstract class SeminarRepository {
	async getAll(): Promise<SeminarEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async create(Seminar: SeminarEntity): Promise<SeminarEntity> {
		throw new Error('Method not implemented.');
	}
	async update(seminar: SeminarEntity): Promise<SeminarEntity>{
		throw new Error('Method not implemented.');
	}
	async delete(seminarTitle: string): Promise<SeminarEntity>{
		throw new Error('Method not implemented.');
	}
}