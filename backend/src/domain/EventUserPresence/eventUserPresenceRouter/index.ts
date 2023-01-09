import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createEventUserPresenceInteractor from '../interactors/createEventUserPresenceInteractor';
import deleteEventUserPresenceInteractor from '../interactors/deleteEventUserPresenceInteractor';
import getEventUserPresenceInteractor from '../interactors/getEventUserPresenceInteractor';
import listEventUserPresencesInteractor from '../interactors/listEventUserPresencesInteractor';
import updateEventUserPresenceInteractor from '../interactors/updateEventUserPresenceInteractor';
import { EventUserPresenceEntity } from '../model/EventUserPresenceEntity';
import { updateEventUserPresenceEntity } from '../model/updateEventUserPresenceEntity';
import EventUserPresenceRepositoryPrisma from '../repository/EventUserPresenceRepositoryPrisma';

let repo = new EventUserPresenceRepositoryPrisma();

export default t.router({
	createEventUserPresence: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				presenceStatus: z.boolean(),
				roomTimeEventId: z.string(),
				userId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let eventUserPresence: EventUserPresenceEntity = {
				...input,
				id: '',
			};
			let newEventUserPresence = await createEventUserPresenceInteractor(
				repo,
				eventUserPresence
			);
			return newEventUserPresence;
		}),

	deleteEventUserPresenceById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteEventUserPresenceInteractor(input, repo);
			return a;
		}),

	getEventUserPresenceById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let eventUserPresence = await getEventUserPresenceInteractor(repo, input);
			return eventUserPresence;
		}),

	listEventUserPresences: t.procedure.query(async () => {
		let eventUserPresences = await listEventUserPresencesInteractor(repo);
		return eventUserPresences as EventUserPresenceEntity[];
	}),

	updateEventUserPresenceById: t.procedure
		.input(
			z.object({
				id: z.string(),
				presenceStatus: z.boolean(),
				// roomTimeEventId: z.string().optional(),
				// userId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let eventUserPresence: updateEventUserPresenceEntity = { ...input };
			let updatedEventUserPresence = await updateEventUserPresenceInteractor(
				repo,
				eventUserPresence
			);
			return updatedEventUserPresence;
		}),
});
