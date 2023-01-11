import { z } from 'zod';
import { t } from '../../../controllers/trpc';
import EventRepositoryPrisma from '../../Event/repository/EventRepositoryPrisma';
import RoomTimeEventRepositoryPrisma from '../../RoomTimeEvent/repository/RoomTimeEventRepositoryPrisma';
import SeminarSuggestionRepositoryPrisma from '../../SeminarSuggestion/repository/SeminarSuggestionRepositoryPrisma';
import approveSeminarInteractor from '../interactors/approveSeminarInteractor';
import createSeminarInteractor from '../interactors/createSeminarInteractor';
import deleteSeminarInteractor from '../interactors/deleteSeminarInteractor';
import getSeminarInteractor from '../interactors/getSeminarInteractor';
import listSeminarsInteractor from '../interactors/listSeminarsInteractor';
import updateSeminarInteractor from '../interactors/updateSeminarInteractor';
import { SeminarEntity } from '../model/SeminarEntity';
import { updateSeminarEntity } from '../model/updateSeminarEntity';
import SeminarRepositoryPrisma from '../repository/SeminarRepositoryPrisma';

let repo = new SeminarRepositoryPrisma();
let eventRepo = new EventRepositoryPrisma();
let rteRepo = new RoomTimeEventRepositoryPrisma();
let pinnedEventRepo = new SeminarSuggestionRepositoryPrisma();

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

	listSeminars: t.procedure.query(async () => {
		let response = await listSeminarsInteractor(repo);
		return response;
	}),

	approveSeminar: t.procedure
		.input(
			z.object({
				seminarId: z.string(),
				dateStart: z.number(),
				dateEnd: z.number(),
				roomId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let a = {
				...input,
				dateStart: new Date(input.dateStart * 1000),
				dateEnd: new Date(input.dateEnd * 1000),
			};
			let rez = await approveSeminarInteractor(
				repo,
				eventRepo,
				rteRepo,
				pinnedEventRepo,
				a
			);
			return rez;
		}),
});
