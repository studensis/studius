import { nullable, z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import listEnrolledUsersInteractor from '../interactors/listEnrolledUsersInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';
import { SubjectEntity } from '../SubjectEntity';
import { updateSubjectEntity } from '../updateSubjectEntity';

let repo = new SubjectRepositoryPrisma();

export default t.router({
	createSubject: t.procedure
		.use(isAdmin)
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
		.mutation(async ({ input }) => {
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
			return newSubject;
		}),

	deleteSubjectById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteSubjectInteractor(input, repo);
			return a;
		}),

	getSubjectById: t.procedure.input(z.string()).query(async ({ input }) => {
		let subject = await getSubjectInteractor(repo, input);
		return subject;
	}),

	listSubjects: t.procedure.query(async () => {
		let subjects = await listSubjectsInteractor(repo);
		return subjects;
	}),

	updateSubjectById: t.procedure
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
		.mutation(async ({ input }) => {
			let subject: updateSubjectEntity = { ...input };
			let updatedSubject = await updateSubjectInteractor(repo, subject);
			return updatedSubject;
		}),

	getEnrolledUsers: t.procedure.input(z.string()).query(async ({input}) =>{
		let enrolledUsers = await listEnrolledUsersInteractor(repo, input);
		return enrolledUsers;
	}),
});
