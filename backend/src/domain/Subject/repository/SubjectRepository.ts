import { EnrollmentEntity } from '../../Enrollment/EnrollmentEntity';
import { UserEntity } from '../../User/UserEntity';
import {SubjectEntity} from '../SubjectEntity';
import { updateSubjectEntity } from '../updateSubjectEntity';

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
	async addContent(id: string, contentId: string[]): Promise<SubjectEntity> {
		throw new Error('Method not implemented.');
	}
	async getEnrolledUsers(subjectId: string): Promise<EnrollmentEntity[]> {
		throw new Error('Method not implemented.');
	}

}
