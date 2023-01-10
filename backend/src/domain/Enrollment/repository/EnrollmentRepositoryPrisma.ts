import { PrismaClient } from '@prisma/client';
import { key } from '../model/compositeKey';
import { EnrollmentEntity } from '../model/EnrollmentEntity';
import { updateEnrollmentEntity } from '../model/updateEnrollment';
import { EnrollmentRepository } from './EnrollmentRepository';

const prisma = new PrismaClient();

export default class EnrollmentRepositoryPrisma extends EnrollmentRepository {
	async create(data: EnrollmentEntity) {
		let enrollment = await prisma.enrollment.create({
			data: {
				userId: data.userId,
				subjectId: data.subjectId,
				enrollmentDate: undefined,
				roleTitle: data.roleTitle,
				status: data.status,
			},
		});
		let rez: EnrollmentEntity = enrollment;
		return rez;
	}

	async update(data: updateEnrollmentEntity) {
		let updatedData = await prisma.enrollment.update({
			where: {
				userId_subjectId: {
					userId: data.userId,
					subjectId: data.subjectId,
				},
			},
			data: {
				roleTitle: data.roleTitle ? data.roleTitle : undefined,
				status: data.status ? data.status : undefined,
			},
		});

		let rez: EnrollmentEntity = updatedData;
		return rez;
	}

	async delete(enrollmentId: key) {
		let deleted = await prisma.enrollment.delete({
			where: {
				userId_subjectId: {
					userId: enrollmentId.userId,
					subjectId: enrollmentId.subjectId,
				},
			},
		});

		let rez: EnrollmentEntity = deleted;
		return rez;
	}

	async getAll() {
		let enrollments = await prisma.enrollment.findMany();

		let result: EnrollmentEntity[] = [];
		enrollments.forEach((e: EnrollmentEntity) => {
			let enrollment: EnrollmentEntity = e;
			result.push(enrollment);
		});

		return result;
	}

	async getByUserId(userId: string) {
		let rez = await prisma.enrollment.findMany({
			where: {
				userId: userId,
			},
		});
		let result: EnrollmentEntity[] = [];
		rez.forEach((e: EnrollmentEntity) => {
			let enrollment: EnrollmentEntity = e;
			result.push(enrollment);
		});

		return result;
	}

	async getBySubjectId(subjectId: string) {
		let rez = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
			},
		});
		let result: EnrollmentEntity[] = [];
		rez.forEach((e: EnrollmentEntity) => {
			let enrollment: EnrollmentEntity = e;
			result.push(enrollment);
		});

		return result;
	}
}
