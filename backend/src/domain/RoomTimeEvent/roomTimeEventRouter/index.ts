// import { z } from 'zod';
// import { t } from '../../../controllers/trpc';
// import createRoomTimeEventInteractor from '../interactors/createRoomTimeEventInteractor';
// import deleteRoomTimeEventInteractor from '../interactors/deleteRoomTimeEventInteractor';
// import getRoomTimeEventInteractor from '../interactors/getRoomTimeEventInteractor';
// import listEventUserPresencesInteractor from '../interactors/listAssociatedEventUserPresencesInteractor';
// import listRoomTimeEventsInteractor from '../interactors/listRoomTimeEventsInteractor';
// import updateRoomTimeEventInteractor from '../interactors/updateRoomTimeEventInteractor';
// import { RoomTimeEventEntity } from '../model/RoomTimeEventEntity';
// import { updateRoomTimeEventEntity } from '../model/updateRoomTimeEventEntity';
// import RoomTimeEventRepositoryPrisma from '../repository/RoomTimeEventRepositoryPrisma';

// let repo = new RoomTimeEventRepositoryPrisma();

// export default t.router({
// 	createRoomTimeEvent: t.procedure
// 		//.use(isAdmin)
// 		.input(
// 			z.object({
// 				dateStart: z.string(),
// 				dateEnd: z.string(),
// 				eventId: z.string(),
// 				roomId: z.string(),
// 				status: z.enum(['ACTIVE', 'ARCHIVED']),
// 			})
// 		)
// 		.mutation(async ({ input }) => {
// 			let roomTimeEvent: RoomTimeEventEntity = {
// 				...input,
// 				id: '',
// 				dateStart: new Date(Date.parse(input.dateStart)),
// 				dateEnd: new Date(Date.parse(input.dateEnd)),
// 				eventId: input.eventId,
// 				roomId: input.roomId,
// 				status: input.status,
// 			};
// 			let newRoomTimeEvent = await createRoomTimeEventInteractor(
// 				repo,
// 				roomTimeEvent
// 			);
// 			return newRoomTimeEvent;
// 		}),

// 	deleteRoomTimeEventById: t.procedure
// 		//.use(isAdmin)
// 		.input(z.string())
// 		.mutation(async ({ input }) => {
// 			let a = await deleteRoomTimeEventInteractor(input, repo);
// 			return a;
// 		}),

// 	getRoomTimeEventById: t.procedure
// 		.input(z.string())
// 		.query(async ({ input }) => {
// 			let roomTimeEvent = await getRoomTimeEventInteractor(repo, input);
// 			return roomTimeEvent;
// 		}),

// 	listRoomTimeEvents: t.procedure.query(async () => {
// 		let roomTimeEvents = await listRoomTimeEventsInteractor(repo);
// 		return roomTimeEvents as RoomTimeEventEntity[];
// 	}),

// 	updateRoomTimeEventById: t.procedure
// 		.input(
// 			z.object({
// 				id: z.string(),
// 				dateStart: z.string().optional(),
// 				dateEnd: z.string().optional(),
// 				eventId: z.string().optional(),
// 				roomId: z.string().optional(),
// 				status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
// 			})
// 		)
// 		.mutation(async ({ input }) => {
// 			let roomTimeEvent: updateRoomTimeEventEntity = {
// 				...input,
// 				dateStart: input.dateStart
// 					? new Date(Date.parse(input.dateStart))
// 					: undefined,
// 				dateEnd: input.dateEnd
// 					? new Date(Date.parse(input.dateEnd))
// 					: undefined,
// 				eventId: input.eventId,
// 				roomId: input.roomId,
// 				status: input.status,
// 			};
// 			let updatedRoomTimeEvent = await updateRoomTimeEventInteractor(
// 				repo,
// 				roomTimeEvent
// 			);
// 			return updatedRoomTimeEvent;
// 		}),

// 	listEventUserPresences: t.procedure
// 		.input(z.string())
// 		.query(async ({ input }) => {
// 			let eventUserPresences = await listEventUserPresencesInteractor(
// 				repo,
// 				input
// 			);
// 			return eventUserPresences;
// 		}),
// });
