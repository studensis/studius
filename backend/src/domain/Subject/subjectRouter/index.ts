import { z } from 'zod';
import {
	adminProcedure,
	authedProcedure,
	publicProcedure,
} from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { EnrollmentEntity } from '../../Enrollment/model/EnrollmentEntity';
import EnrollmentRepositoryPrisma from '../../Enrollment/repository/EnrollmentRepositoryPrisma';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import { paginationObj } from '../../pagination/paginationObj';
import PinnedScheduleRepositoryPrisma from '../../PinnedSchedule/repository/PinnedScheduleRepositoryPrisma';
import PostRepositoryPrisma from '../../Post/repository/PostRepositoryPrisma';
import enrollUserInteractor from '../../User/interactors/enrollUserIneractor';
import archiveEnrollmentBySubjectIdInteractor from '../interactors/archiveEnrollmentBySubjectIdInteractor';
import archiveSubjectInteractor from '../interactors/archiveSubjectInteractor';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteEnrollmentBySubjectIdInteractor from '../interactors/deleteEnrollmentBySubjectIdInteractor';
import deletePinnedScheduleBySubjectIdInteractor from '../interactors/deletePinnedScheduleBySubjectIdInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import getSubjectPostsInteractor from '../interactors/getSubjectPostsInteractor';
import listEnrolledUsersInteractor from '../interactors/listEnrolledUsersInteractor';
import listPaginatedSubjectsInteractor from '../interactors/listPaginatedSubjectsInteractor';
import listPinnedSchedulesBySubjectIdInteractor from '../interactors/listPinnedSchedulesBySubjectIdInteractor';
import listSubjectPostsInteractor from '../interactors/listSubjectPostsInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import { SubjectEntity } from '../model/SubjectEntity';
import { updateSubjectEntity } from '../model/updateSubjectEntity';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';

let repo = new SubjectRepositoryPrisma();
let enrollmentRepo = new EnrollmentRepositoryPrisma();
let pinnedScheduleRepo = new PinnedScheduleRepositoryPrisma();
let eventRepo = new EventRepositoryPrisma();
let postsRepo = new PostRepositoryPrisma();

const isEditor = t.middleware(({ next, ctx }) => {
	ctx.user;
	return next();
});

export default t.router({
	createSubject: adminProcedure
		.input(
			z.object({
				// id: z.string(),
				title: z.string(),
				description: z.string(),
				ectsBod: z.string(),
				semester: z.enum(['WINTER', 'SUMMER']),
				status: z.enum(['ACTIVE', 'ARCHIVED']),
				contentId: z.array(z.string()).optional(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			let subject: SubjectEntity = {
				...input,
				id: '',
				title: input.title,
				description: input.description,
				ectsBod: input.ectsBod,
				semester: input.semester,
				status: input.status,
				contentId: input.contentId ? input.contentId : [],
			};
			let newSubject = await createSubjectInteractor(repo, subject);

			let enrollment: EnrollmentEntity = {
				userId: ctx.user!.userId,
				subjectId: newSubject.id,
				roleTitle: 'OWNER',
				enrollmentDate: new Date(Date.now()),
				status: 'ACTIVE',
			};
			let newEnrollment = await enrollUserInteractor(
				enrollment,
				enrollmentRepo
			);

			return newSubject;
		}),

	deleteSubjectById: adminProcedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await deleteEnrollmentBySubjectIdInteractor(
				input,
				enrollmentRepo
			);
			let c = await deletePinnedScheduleBySubjectIdInteractor(
				input,
				pinnedScheduleRepo
			);
			let a = await deleteSubjectInteractor(input, repo);
			return a;
		}),

	archiveSubjectById: adminProcedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await archiveEnrollmentBySubjectIdInteractor(
				input,
				enrollmentRepo
			);
			let a = await archiveSubjectInteractor(input, repo);
			return a;
		}),

	getSubjectById: publicProcedure.input(z.string()).query(async ({ input }) => {
		let subject = await getSubjectInteractor(repo, input);
		return subject;
	}),

	listSubjects: publicProcedure.query(async () => {
		let subjects = await listSubjectsInteractor(repo);
		return subjects;
	}),

	listPaginatedSubjects: publicProcedure
		.input(paginationObj)
		.query(async ({ input }) => {
			let response = await listPaginatedSubjectsInteractor(repo, input);
			return response;
		}),

	updateSubjectById: authedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				description: z.string().optional(),
				ectsBod: z.string().optional(),
				semester: z.enum(['WINTER', 'SUMMER']).optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
				contentId: z.array(z.string()).optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			let subject: updateSubjectEntity = { ...input };
			let updatedSubject = await updateSubjectInteractor(
				ctx.user.userId,
				ctx.user.role,
				enrollmentRepo,
				repo,
				subject
			);
			return updatedSubject;
		}),

	getEnrolledUsers: publicProcedure
		.input(
			z.object({
				active: z.boolean().optional(),
				archived: z.boolean().optional(),
				subjectId: z.string(),
			})
		)
		.query(async ({ input }) => {
			let enrolledUsers = await listEnrolledUsersInteractor(
				enrollmentRepo,
				input.active,
				input.archived,
				input.subjectId
			);
			return enrolledUsers;
		}),

	getPinnedSchedules: publicProcedure
		.input(z.string())
		.query(async ({ input }) => {
			let pinnedSchedules = await listPinnedSchedulesBySubjectIdInteractor(
				pinnedScheduleRepo,
				input
			);
			return pinnedSchedules;
		}),

	getSubjectPosts: publicProcedure
		.input(z.string())
		.query(async ({ input }) => {
			let response = await getSubjectPostsInteractor(postsRepo, input);
			return response;
		}),

	listSubjectPosts: publicProcedure.query(async () => {
		let response = await listSubjectPostsInteractor(postsRepo);
		return response;
	}),
});
