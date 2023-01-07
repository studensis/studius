import { key } from '../model/compositeKey';
import { EnrollmentEntity } from '../model/EnrollmentEntity';

export abstract class EnrollmentRepository {
	async create(data: EnrollmentEntity): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}

	async getAll(): Promise<EnrollmentEntity[]> {
		throw new Error('Method not implemented');
	}

	async getBySubjectId(subjectId: string): Promise<EnrollmentEntity[]> {
		throw new Error('Method not implemented');
	}

	async getByUserId(userId: string): Promise<EnrollmentEntity[]> {
		throw new Error('Method not implemented');
	}

	async delete(enrollmentId: key): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented');
	}

	async update(newData: EnrollmentEntity): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented');
	}
}
