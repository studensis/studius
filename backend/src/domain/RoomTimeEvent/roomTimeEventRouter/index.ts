import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createRoomTimeEventInteractor from '../interactors/createRoomTimeEventInteractor';
import deleteRoomTimeEventInteractor from '../interactors/deleteRoomTimeEventInteractor';
import getRoomTimeEventInteractor from '../interactors/getRoomTimeEventInteractor';
import listRoomTimeEventsInteractor from '../interactors/listRoomTimeEventsInteractor';
import updateRoomTimeEventInteractor from '../interactors/updateRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

let repo = new RoomTimeEventRepositoryPrisma();

export default t.router({
	createRoomTimeEvent: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				dateStart: z.string(),
				dateEnd: z.string(),
				eventId: z.string(),
				roomId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let roomTimeEvent: RoomTimeEventEntity = {
				...input,
				id: '',
				dateStart: new Date(Date.parse(input.dateStart)),
				dateEnd: new Date(Date.parse(input.dateEnd)),
			};
			let newRoomTimeEvent = await createRoomTimeEventInteractor(
				repo,
				roomTimeEvent
			);
			return newRoomTimeEvent;
		}),

	deleteRoomTimeEventById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteRoomTimeEventInteractor(input, repo);
			return a;
		}),

	getRoomTimeEventById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let roomTimeEvent = await getRoomTimeEventInteractor(repo, input);
			return roomTimeEvent;
		}),

	listRoomTimeEvents: t.procedure.query(async () => {
		let roomTimeEvents = await listRoomTimeEventsInteractor(repo);
		return roomTimeEvents as RoomTimeEventEntity[];
	}),

	updateRoomTimeEventById: t.procedure
		.input(
			z.object({
				id: z.string(),
				dateStart: z.string().optional(),
				dateEnd: z.string().optional(),
				eventId: z.string().optional(),
				roomId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let roomTimeEvent: updateRoomTimeEventEntity = {
				...input,
				dateStart: input.dateStart
					? new Date(Date.parse(input.dateStart))
					: undefined,
				dateEnd: input.dateEnd
					? new Date(Date.parse(input.dateEnd))
					: undefined,
			};
			let updatedRoomTimeEvent = await updateRoomTimeEventInteractor(
				repo,
				roomTimeEvent
			);
			return updatedRoomTimeEvent;
		}),
});