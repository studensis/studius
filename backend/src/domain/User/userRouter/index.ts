import { z } from 'zod';
import {
	adminProcedure,
	publicProcedure,
} from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import { paginationObj } from '../../pagination/paginationObj';
import PostRepositoryPrisma from '../../Post/repository/PostRepositoryPrisma';
import createUserInteractor from '../interactors/createUserInteractor';
import deleteUserInteractor from '../interactors/deleteUserInteractor';
import enrollUserInteractor from '../interactors/enrollUserIneractor';
import getUserInteractor from '../interactors/getUserInteractor';
import getUserPostsInteractor from '../interactors/getUserPostsInteractor';
import isUserEnrolledInteractor from '../interactors/isUserEnrolledInteractor';
import listEnrolledSubjectsInteractor from '../interactors/listEnrolledSubjectsInteractor';
import listMenteesInteractor from '../interactors/listMenteeInteractor';
import listPaginatedUsersInteractor from '../interactors/listPaginatedUsersInteractor';
import listUserPostsInteractor from '../interactors/listUserPostsInteractor';
import listUsersInteractor from '../interactors/listUsersInteractor';
import updateEnrollmentInteractor from '../interactors/updateEnrollmentInteractor';
import updateUserInteractor from '../interactors/updateUserInteractor';
import wasUserEnrolledInteractor from '../interactors/wasUserEnrolledInteractor';
import { updateUserEntity } from '../model/updateUserEntity';
import { UserEntity } from '../model/UserEntity';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';

let repo = new UserRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();
let postRepo = new PostRepositoryPrisma();

export default t.router({
	createUser: adminProcedure
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
				avatar: null,
				googleUserId: null,
			};
			let newUser = await createUserInteractor(repo, user);
			return newUser;
		}),

	deleteUserById: adminProcedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteUserInteractor(input, repo, enrollmentRepo);
			return a;
		}),

	getUserById: publicProcedure.input(z.string()).query(async ({ input }) => {
		let user = await getUserInteractor(repo, input);
		return user;
	}),

	listUsers: publicProcedure.query(async () => {
		let users = await listUsersInteractor(repo);
		return users as UserEntity[];
	}),

	listUsersPaginated: publicProcedure
		.input(paginationObj)
		.query(async ({ input }) => {
			let response = await listPaginatedUsersInteractor(repo, input);
			//Popraviti ovo
			let len = (await listUsersInteractor(repo)).length;
			return { users: response, numberOfUsers: len };
		}),

	updateUserById: publicProcedure

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
				avatar: z.string().optional(),
				googleUserId: z.string().nullable().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let user: updateUserEntity = { ...input };
			let updatedUser = await updateUserInteractor(repo, user);
			return updatedUser;
		}),

	enrollUser: publicProcedure

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
			let enrollmentExists: boolean = await isUserEnrolledInteractor(
				enrollmentRepo,
				input.userId,
				input.subjectId
			);

			if (enrollmentExists)
				throw new Error(
					'This User already has an ACTIVE Enrollment with this Subject'
				);
			else {
				let enrollment: EnrollmentEntity = {
					...input,
					id: undefined,
					userId: input.userId,
					subjectId: input.subjectId,
					enrollmentDate: input.enrollmentDate || null,
					roleTitle: input.roleTitle,
					status: input.status,
				};
				let newEnrollment = await enrollUserInteractor(
					enrollment,
					enrollmentRepo
				);
				return newEnrollment;
			}
		}),

	isUserEnrolled: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				subjectId: z.string(),
			})
		)
		.query(async ({ input }) => {
			let isEnrolled = await isUserEnrolledInteractor(
				enrollmentRepo,
				input.userId,
				input.subjectId
			);
			return isEnrolled;
		}),

	wasUserEnrolled: publicProcedure
		.input(
			z.object({
				userId: z.string(),
				subjectId: z.string(),
			})
		)
		.query(async ({ input }) => {
			let wasEnrolled = await wasUserEnrolledInteractor(
				enrollmentRepo,
				input.userId,
				input.subjectId
			);
			return wasEnrolled;
		}),

	getEnrolledSubjects: publicProcedure
		.input(
			z.object({
				active: z.boolean().optional(),
				archived: z.boolean().optional(),
				userId: z.string(),
			})
		)
		.query(async ({ input }) => {
			let enrollments = await listEnrolledSubjectsInteractor(
				enrollmentRepo,
				input.active,
				input.archived,
				input.userId
			);
			return enrollments;
		}),

	updateEnrollment: publicProcedure

		.input(
			z.object({
				id: z.string(),
				userId: z.string().optional(),
				subjectId: z.string().optional(),
				enrollmentDate: z.date().optional(),
				roleTitle: z
					.enum(['STUDENT', 'PROFESSOR', 'OWNER', 'DEMONSTRATOR', 'ASSISTANT'])
					.optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
			})
		)
		.mutation(async ({ input }) => {
			let updateData = {
				...input,
				id: input.id,
				userId: input.userId,
				subjectId: input.subjectId,
				roleTitle: input.roleTitle,
				status: input.status,
			};

			let updatedEnrollment = await updateEnrollmentInteractor(
				enrollmentRepo,
				updateData as EnrollmentEntity
			);
			return updatedEnrollment;
		}),

	listMentees: t.procedure.input(z.string()).query(async ({ input }) => {
		let mentees = await listMenteesInteractor(repo, input);
		return mentees;
	}),

	getUserPosts: publicProcedure.input(z.string()).query(async ({ input }) => {
		let response = await getUserPostsInteractor(postRepo, input);
		return response;
	}),

	listUserPosts: publicProcedure.query(async () => {
		let response = await listUserPostsInteractor(postRepo);
		return response;
	}),
});
