import { PrismaClient } from '@prisma/client';
import { EnrollmentEntity } from '../model/EnrollmentEntity';
import { updateEnrollmentEntity } from '../model/updateEnrollmentEntity';
import { EnrollmentRepository } from './EnrollmentRepository';

const prisma = new PrismaClient();

export default class EnrollmentRepositoryPrisma extends EnrollmentRepository {
	async getAll() {
		// prisma Enrollments
		let datas = await prisma.enrollment.findMany();

		// map to EnrollmentEntities
		let enrollments: EnrollmentEntity[] = [];
		datas.forEach((data: EnrollmentEntity) => {
			let enrollment: EnrollmentEntity = data;
			enrollments.push(enrollment);
		});

		return enrollments;
	}

	async getById(id: string) {
		let data = await prisma.enrollment.findUnique({ where: { id: id } });
		if (data) {
			let enrollment: EnrollmentEntity = data;
			return enrollment;
		} else {
			throw new Error('no data');
		}
	}

	async updateEnrollment(newData: updateEnrollmentEntity) {
		let updatedData = await prisma.enrollment.update({
			where: {
				id: newData.id,
			},
			data: {
				roleTitle: newData.roleTitle,
				status: newData.status,
			},
		});

		let rez: EnrollmentEntity = updatedData;
		return rez;
	}

	async delete(enrollmentId: string) {
		let response = await prisma.enrollment.delete({
			where: {
				id: enrollmentId,
			},
		});

		return response;
	}

	// archives a single enrollment
	async archive(enrollmentId: string) {
		let response = await prisma.enrollment.update({
			where: {
				id: enrollmentId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		return response;
	}

	// gets all enrollments connected to same User
	async getEnrolledSubjects(
		active: boolean | undefined,
		archived: boolean | undefined,
		userId: string
	) {
		active === false && archived === undefined
			? (archived = true)
			: active === undefined && archived === false
			? (active = true)
			: {};

		// samo ako su razliciti onda utjece, inace ispise sve
		let rez = await prisma.enrollment.findMany({
			where: {
				userId: userId,
				status:
					active && !archived
						? 'ACTIVE'
						: !active && archived
						? 'ARCHIVED'
						: undefined,
			},
			include: {
				subject: true,
			},
		});

		return rez;
	}

	// gets all enrollments connected to same Subject
	async getEnrolledUsers(
		active: boolean | undefined,
		archived: boolean | undefined,
		subjectId: string
	) {
		active === false && archived === undefined
			? (archived = true)
			: active === undefined && archived === false
			? (active = true)
			: {};

		// samo ako su razliciti onda utjece, inace ispise sve
		let users = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				status:
					active && !archived
						? 'ACTIVE'
						: !active && archived
						? 'ARCHIVED'
						: undefined,
			},
			include: {
				user: true,
			},
		});
		return users;
	}

	// creates enrollment and connects it to User and Subject
	async enrollUser(
		enrollmentData: EnrollmentEntity
	): Promise<EnrollmentEntity> {
		let enrollment = await prisma.enrollment.create({
			data: {
				userId: enrollmentData.userId,
				subjectId: enrollmentData.subjectId,
				enrollmentDate: undefined,
				roleTitle: enrollmentData.roleTitle,
				status: enrollmentData.status,
			},
		});
		let rez: EnrollmentEntity = enrollment;
		return rez;
	}

	// used in Subject when Subject is archived, archives all enrollments connected to archived Subject
	async archiveEnrollmentBySubjectId(subjectId: string) {
		let response = await prisma.enrollment.updateMany({
			where: {
				subjectId: subjectId,
			},
			data: {
				status: 'ARCHIVED',
			},
		});

		if (response) return 'success';
		else return 'failure';
	}

	// is the User which is enrolled into a subject the OWNER or PROFESSOR
	async isUserEditor(subjectId: string, userId: string) {
		let users = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				status: 'ACTIVE',
			},
			include: {
				user: true,
			},
		});

		let user = users.filter(
			(user: EnrollmentEntity) =>
				user.userId === userId &&
				['PROFESSOR', 'OWNER'].includes(user.roleTitle)
		);

		return user.length >= 1;
	}

	async deleteUserEnrollments(userId: string) {
		let deletedEnrollments = await prisma.enrollment.deleteMany({
			where: {
				userId: userId,
			},
		});

		return deletedEnrollments;
	}

	async deleteSubjectEnrollments(subjectId: string) {
		let deletedEnrollments = await prisma.enrollment.deleteMany({
			where: {
				subjectId: subjectId,
			},
		});

		return deletedEnrollments;
	}

	async isUserEnrolled(userId: string, subjectId: string) {
		let enrollments = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				userId: userId,
				status: 'ACTIVE',
			},
		});

		let enrollmentsData: EnrollmentEntity[] = enrollments;

		return enrollmentsData.length > 0;
	}

	async wasUserEnrolled(userId: string, subjectId: string) {
		let enrollments = await prisma.enrollment.findMany({
			where: {
				subjectId: subjectId,
				userId: userId,
				status: 'ARCHIVED',
			},
		});

		let enrollmentsData: EnrollmentEntity[] = enrollments;

		return enrollmentsData.length > 0;
	}
}
