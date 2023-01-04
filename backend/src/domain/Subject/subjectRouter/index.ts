import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createSubjectInteractor from '../interactors/createSubjectInteractor';
import deleteSubjectInteractor from '../interactors/deleteSubjectInteractor';
import getSubjectInteractor from '../interactors/getSubjectInteractor';
import listSubjectsInteractor from '../interactors/listSubjectsInteractor';
import updateSubjectInteractor from '../interactors/updateSubjectInteractor';
import SubjectRepositoryPrisma from '../repository/SubjectRepositoryPrisma';
import SubjectEntity from '../SubjectEntity';

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
				subjectRole: z.enum(['STUDENT', 'PROFESSOR', 'OWNER', 'DEMONSTRATOR', 'ASSISTANT']),
			})
		)
		.mutation(async ({ input }) => {
			let subject = new SubjectEntity({
				...input,
				id: '',
				title: input.title,
				description: input.description,
				ectsBod: input.ectsBod,
				semester: input.semester,
				status: input.status,
				subjectRole: input.subjectRole || 'STUDENT',

			});
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
		console.log('jedan');
		let subjects = await listSubjectsInteractor(repo);
		console.log(subjects);
		return subjects as SubjectEntity[];
	}),

	updateSubject: t.procedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string(),
				lastname: z.string(),
				password: z.string(),
				jmbag: z.string(),
				email: z.string(),
				subjectRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']),
				mentorID: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let subject = new SubjectEntity(input);
			let updatedSubject = await updateSubjectInteractor(repo, subject);
			return updatedSubject;
		}),
});