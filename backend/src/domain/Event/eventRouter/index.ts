import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { EventEntity } from '../EventEntity';
import createEventInteractor from '../interactors/createEventInteractor';
import deleteEventInteractor from '../interactors/deleteEventInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';
import { updateEventEntity } from '../updateEventEntity';

let repo = new EventRepositoryPrisma();

export default t.router({
	createEvent: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				linkedEntity: z.enum(['USER', 'SUBJECT', 'SEMINAR', 'POST']),
				linkedEntityId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let event: EventEntity = {
				...input,
				id: '',
				linkedEntity: input.linkedEntity,
			};
			let newEvent = await createEventInteractor(repo, event);
			return newEvent;
		}),

	deleteEventById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteEventInteractor(input, repo);
			return a;
		}),

	getEventById: t.procedure.input(z.string()).query(async ({ input }) => {
		let event = await getEventInteractor(repo, input);
		return event;
	}),

	listEvents: t.procedure.query(async () => {
		let events = await listEventsInteractor(repo);
		return events as EventEntity[];
	}),

	updateEventById: t.procedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				description: z.string().optional(),
				linkedEntity: z
					.enum(['USER', 'SUBJECT', 'SEMINAR', 'POST'])
					.optional(),
				linkedEntityId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let event: updateEventEntity = { ...input };
			let updatedEvent = await updateEventInteractor(repo, event);
			return updatedEvent;
		}),
});
