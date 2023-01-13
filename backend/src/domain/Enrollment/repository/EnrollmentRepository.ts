import { SubjectEntity } from '../../Subject/model/SubjectEntity';
import { UserEntity } from '../../User/model/UserEntity';
import { EnrollmentEntity } from '../model/EnrollmentEntity';
import { updateEnrollmentEntity } from '../model/updateEnrollmentEntity';

export abstract class EnrollmentRepository {
	async getAll(): Promise<EnrollmentEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(enrollmentId: string): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
	async archive(enrollmentId: string): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
	async archiveEnrollmentBySubjectId(subjectId: string): Promise<string> {
		throw new Error('Method not implemented.');
	}
	async isUserEditor(subjectId: string, userId: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	async updateEnrollment(
		newData: updateEnrollmentEntity
	): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
	async getEnrolledSubjects(
		userId: string
	): Promise<(EnrollmentEntity & { subject: SubjectEntity })[]> {
		throw new Error('Method not implemented.');
	}
	async getEnrolledUsers(
		subjectId: string
	): Promise<(EnrollmentEntity & { user: UserEntity })[]> {
		throw new Error('Method not implemented.');
	}
	async enrollUser(
		enrollmentData: EnrollmentEntity
	): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
}
