import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { EnrollmentEntity } from '../../Enrollment/EnrollmentEntity';
import createUserInteractor from '../interactors/createUserInteractor';
import deleteUserInteractor from '../interactors/deleteUserInteractor';
import enrollUserInteractor from '../interactors/enrollUserIneractor';
import getUserInteractor from '../interactors/getUserInteractor';
import listEnrolledSubjectsInteractor from '../interactors/listEnrolledSubjectsInteractor';
import listUsersInteractor from '../interactors/listUsersInteractor';
import updateEnrollmentInteractor from '../interactors/updateEnrollmentInteractor';
import updateUserInteractor from '../interactors/updateUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';
import { updateUserEntity } from '../updateUserEntity';
import { UserEntity } from '../UserEntity';

let repo = new UserRepositoryPrisma();

export default t.router({
	createUser: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				firstname: z.string(),
				lastname: z.string(),
				password: z.string(),
				jmbag: z.string().optional(),
				email: z.string(),
				userRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']),
				mentorID: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let user: UserEntity = {
				...input,
				id: '',
				jmbag: input.jmbag || null,
				userRole: input.userRole,
				mentorID: input.mentorID || null,
			};
			let newUser = await createUserInteractor(repo, user);
			return newUser;
		}),

	deleteUserById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteUserInteractor(input, repo);
			return a;
		}),

	getUserById: t.procedure.input(z.string()).query(async ({ input }) => {
		let user = await getUserInteractor(repo, input);
		return user;
	}),

	listUsers: t.procedure.query(async () => {
		let users = await listUsersInteractor(repo);
		return users as UserEntity[];
	}),

	updateUserById: t.procedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string().optional(),
				lastname: z.string().optional(),
				password: z.string().optional(),
				jmbag: z.string().optional(),
				email: z.string().optional(),
				userRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']).optional(),
				mentorID: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let user: updateUserEntity = { ...input };
			let updatedUser = await updateUserInteractor(repo, user);
			return updatedUser;
		}),

	enrollUser: t.procedure
		.input(
			z.object({
				userId: z.string(),
				subjectId: z.string(),
				enrollmentDate: z.date().optional(),
				roleTitle: z.enum([
					'STUDENT',
					'PROFESSOR',
					'OWNER',
					'DEMONSTRATOR',
					'ASSISTANT',
				]),
				status: z.enum(['ACTIVE', 'ARCHIVED']),
			})
		)
		.mutation(async ({ input }) => {
			let enrollment: EnrollmentEntity = {
				...input,
				userId: input.userId,
				subjectId: input.subjectId,
				enrollmentDate: input.enrollmentDate || null,
				roleTitle: input.roleTitle,
				status: input.status,
			};

			let newEnrollment = await enrollUserInteractor(enrollment, repo);
			return newEnrollment;
		}),

	getEnrolledSubjects: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let enrollments = await listEnrolledSubjectsInteractor(input, repo);
			return enrollments;
		}),

	updateEnrollment: t.procedure
		.input(
			z.object({
				userId: z.string(),
				subjectId: z.string(),
				enrollmentDate: z.date().optional(),
				roleTitle: z
					.enum([
						'STUDENT',
						'PROFESSOR',
						'OWNER',
						'DEMONSTRATOR',
						'ASSISTANT',
					])
					.optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
			})
		)
		.mutation(async ({ input }) => {
			let updateData = {
				...input,
				userId: input.userId,
				subjectId: input.subjectId,
				roleTitle: input.roleTitle,
				status: input.status,
			};

			let updatedEnrollment = await updateEnrollmentInteractor(
				repo,
				updateData as EnrollmentEntity
			);
			return updatedEnrollment;
		}),
});
