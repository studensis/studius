import { z } from 'zod';
import { t } from '../../../controllers/trpc';
import approveSeminarInteractor from '../interactors/approveSeminarInteractor';
import createSeminarInteractor from '../interactors/createSeminarInteractor';
import deleteSeminarInteractor from '../interactors/deleteSeminarInteractor';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import listSeminarsInteractor from '../interactors/listSeminarsInteractor';
import listUserSeminars from '../interactors/listUserSeminars';
import updateSeminarInteractor from '../interactors/updateSeminarInteractor';
import { SeminarEntity } from '../model/SeminarEntity';
import { updateSeminarEntity } from '../model/updateSeminarEntity';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

let repo = new SeminarRepositoryPrisma();

export default t.router({
	createSeminar: t.procedure
		.input(
			z.object({
				title: z.string(),
				description: z.string().optional(),
				mentorId: z.string().optional(),
				contentId: z.string().optional(),
				subjectId: z.string().optional(),
				userId: z.string().optional(),
				status: z.enum(['DRAFT', 'CONFIRMED']).optional(),
			})
		)
		.mutation(async ({ input }) => {
			let seminar: SeminarEntity = {
				...input,
				id: '',
				title: input.title,
				description: input.description,
				mentorId: input.mentorId,
				contentId: input.contentId,
				subjectId: input.subjectId,
				userId: input.userId,
				status: input.status,
			};

			let newSeminar = await createSeminarInteractor(repo, seminar);
			return newSeminar;
		}),

	deleteSeminar: t.procedure.input(z.string()).mutation(async ({ input }) => {
		let response = await deleteSeminarInteractor(input, repo);
		return response;
	}),

	updateSeminar: t.procedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				description: z.string().optional(),
				mentorId: z.string().optional(),
				contentId: z.string().optional(),
				subjectId: z.string().optional(),
				userId: z.string().optional(),
				status: z.enum(['DRAFT', 'CONFIRMED']).optional(),
			})
		)
		.mutation(async ({ input }) => {
			let updatedSeminar: updateSeminarEntity = {
				...input,
				id: input.id,
				title: input.title,
				description: input.description,
				mentorId: input.mentorId,
				contentId: input.contentId,
				subjectId: input.subjectId,
				userId: input.userId,
				status: input.status,
			};
			let response = await updateSeminarInteractor(repo, input);
			return response;
		}),

	getSeminarById: t.procedure.input(z.string()).query(async ({ input }) => {
		let response = await getSeminarInteractor(repo, input);
		return response;
	}),

	listUserSeminars: t.procedure
		.input(
			z.object({
				id: z.string(),
				options: z.object({ isMentor: z.boolean(), isStudent: z.boolean() }),
			})
		)
		.query(async ({ input }) => {
			let response = await listUserSeminars(repo, input);
			return response;
		}),

	listSeminars: t.procedure.query(async () => {
		let response = await listSeminarsInteractor(repo);
		return response;
	}),

	approveSeminar: t.procedure
		.input(
			z.object({
				seminarId: z.string(),
				dateStart: z.string(),
				dateEnd: z.string(),
				roomId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let a = {
				...input,
				dateStart: new Date(input.dateStart),
				dateEnd: new Date(input.dateEnd),
			};
			let rez = await approveSeminarInteractor(repo, a);
			return rez;
		}),
});
