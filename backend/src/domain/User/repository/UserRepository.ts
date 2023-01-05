import { Subject } from '@prisma/client';
import { EnrollmentEntity } from '../../Enrollment/EnrollmentEntity';
import { updateEnrollmentEntity } from '../../Enrollment/updateEnrollment';
import { updateUserEntity } from '../updateUserEntity';
import { UserEntity } from '../UserEntity';

export abstract class UserRepository {
	async getAll(): Promise<UserEntity[]> {
		throw new Error('Method not implemented.');
	}
	async getById(id: string): Promise<UserEntity | null> {
		throw new Error('Method not implemented.');
	}
	async create(user: UserEntity): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async update(userData: updateUserEntity): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async delete(userId: string): Promise<UserEntity> {
		throw new Error('Method not implemented.');
	}
	async enrollUser(
		enrollmentData: EnrollmentEntity
	): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}
	async getEnrolledSubjects(
		userId: string
	): Promise<(EnrollmentEntity & { subject: Subject })[]> {
		throw new Error('Method not implemented.');
	}
	async updateEnrollment(
		newData: updateEnrollmentEntity
	): Promise<EnrollmentEntity> {
		throw new Error('Method not implemented.');
	}

	async getByEmail(email: string): Promise<UserEntity | null> {
		throw new Error('Method not implemented.');
	}
}
