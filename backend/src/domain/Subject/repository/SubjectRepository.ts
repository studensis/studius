import { User } from '@prisma/client';
import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';

export abstract class SubjectRepository {
	async getAll(): Promise<SubjectEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<SubjectEntity | null> {
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
	async archiveEnrollmentBySubjectId(subjectId: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	async addContent(id: string, contentId: string[]): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async isUserEditor(subjectId: string, userId: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	async getEnrolledUsers(
		subjectId: string
	): Promise<(EnrollmentEntity & { user: User })[]> {
		throw new Error('Method not implemented.');
	}
}
