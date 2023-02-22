import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { paginationObj } from '../../pagination/paginationObj';
import createPinnedEventInteractor from '../interactors/createPinnedEventInteractor';
import deletePinnedEventInteractor from '../interactors/deletePinnedEventInteractor';
import getPinnedEventInteractor from '../interactors/getPinnedEventInteractor';
import listPaginatedPinnedEventsInteractor from '../interactors/listPaginatedPinnedEventsInteractor';
import listPinnedEventsInteractor from '../interactors/listPinnedEventsInteractor';
import updatePinnedEventInteractor from '../interactors/updatePinnedEventInteractor';
import { PinnedEventEntity } from '../model/PinnedEventEntity';
import PinnedEventRepositoryPrisma from '../repository/PinnedEventRepositoryPrisma';

let repo = new PinnedEventRepositoryPrisma();

export default t.router({
	createPinnedEvent: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				eventId: z.string(),
				subjectId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedEvent: PinnedEventEntity = {
				...input,
				id: '',
			};
			let newPinnedEvent = await createPinnedEventInteractor(repo, pinnedEvent);
			return newPinnedEvent;
		}),

	deletePinnedEventById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deletePinnedEventInteractor(input, repo);
			return a;
		}),

	getPinnedEventById: t.procedure.input(z.string()).query(async ({ input }) => {
		let pinnedEvent = await getPinnedEventInteractor(repo, input);
		return pinnedEvent;
	}),

	listPinnedEvents: t.procedure.query(async () => {
		let pinnedEvents = await listPinnedEventsInteractor(repo);
		return pinnedEvents as PinnedEventEntity[];
	}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedPinnedEventsInteractor(repo, input);
		return response;
	}),

	updatePinnedEventById: t.procedure
		.input(
			z.object({
				id: z.string(),
				assignmentId: z.string().optional(),
				subjectId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedEvent = { ...input };
			let updatedPinnedEvent = await updatePinnedEventInteractor(
				repo,
				pinnedEvent
			);
			return updatedPinnedEvent;
		}),
});
