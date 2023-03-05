import { paginationType } from '../../pagination/paginationObj';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';

export abstract class SubjectRepository {
	async getAll(): Promise<SubjectEntity[]> {
		throw new Error('Method not implemented.');
	}
	async listPaginated(
		paginationInfo: paginationType
	): Promise<SubjectEntity[]> {
		throw new Error('Method not implemented.');
	}

	async getById(id: string): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async create(subject: SubjectEntity): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async update(subject: updateSubjectEntity): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(subjectId: string): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async archive(subjectId: string): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async addContent(id: string, contentId: string[]): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
}
