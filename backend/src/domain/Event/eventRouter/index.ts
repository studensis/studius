import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import EventUserPresenceRepositoryPrisma from '../../EventUserPresence/repository/EventUserPresenceRepositoryPrisma';
import archiveRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/archiveRoomTimeEventInteractor';
import createRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/createRoomTimeEventInteractor';
import deleteEventUserPresenceByRTEIDInteractor from '../../RoomTimeEvent/interactors/deleteEventUserPresenceByRTEIDInteractor';
import deleteRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/deleteRoomTimeEventInteractor';
import getRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/getRoomTimeEventInteractor';
import listAssociatedEventUserPresencesInteractor from '../../RoomTimeEvent/interactors/listAssociatedEventUserPresencesInteractor';
import listRoomTimeEventsInteractor from '../../RoomTimeEvent/interactors/listRoomTimeEventsInteractor';
import updateRoomTimeEventInteractor from '../../RoomTimeEvent/interactors/updateRoomTimeEventInteractor';
import { RoomTimeEventEntity } from '../../RoomTimeEvent/model/RoomTimeEventEntity';
import { updateRoomTimeEventEntity } from '../../RoomTimeEvent/model/updateRoomTimeEventEntity';
import RoomTimeEventRepositoryPrisma from '../../RoomTimeEvent/repository/RoomTimeEventRepositoryPrisma';
import archiveEventInteractor from '../interactors/archiveEventInteractor';
import archiveRTEByEventIdInteractor from '../interactors/archiveRTEByEventIdInteractor';
import createEventInteractor from '../interactors/createEventInteractor';
import deleteEventInteractor from '../interactors/deleteEventInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listAssociatedRoomTimeEventsInteractor from '../interactors/listAssociatedRoomTimeEventsInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

let repo = new EventRepositoryPrisma();
let RTErepo = new RoomTimeEventRepositoryPrisma();
let EUPrepo = new EventUserPresenceRepositoryPrisma();

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
				linkedEntity: z.enum(['USER', 'SUBJECT', 'SEMINAR', 'POST']).optional(),
				linkedEntityId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let event: updateEventEntity = { ...input };
			let updatedEvent = await updateEventInteractor(repo, event);
			return updatedEvent;
		}),
	archiveEventById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await archiveRTEByEventIdInteractor(input, RTErepo);
			let a = await archiveEventInteractor(input, repo);
			return a;
		}),
	//
	//
	//
	//	RoomTimeEvent CRUD
	//
	//
	//
	schedule: t.procedure
		//.use(isAdmin)
		.input(
			z.object({
				eventId: z.string(),
				dateStart: z.string(),
				dateEnd: z.string(),
				roomId: z.string(),
				status: z.enum(['ACTIVE', 'ARCHIVED']),
			})
		)
		.mutation(async ({ input }) => {
			let roomTimeEvent: RoomTimeEventEntity = {
				...input,
				id: '',
				dateStart: new Date(Date.parse(input.dateStart)),
				dateEnd: new Date(Date.parse(input.dateEnd)),
				eventId: input.eventId,
				roomId: input.roomId,
				status: input.status,
			};
			let newRoomTimeEvent = await createRoomTimeEventInteractor(
				RTErepo,
				roomTimeEvent
			);
			return newRoomTimeEvent;
		}),

	deleteSchedule: t.procedure
		//.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await deleteEventUserPresenceByRTEIDInteractor(input, EUPrepo);
			let a = await deleteRoomTimeEventInteractor(input, RTErepo);
			return a;
		}),

	archiveSchedule: t.procedure
		//.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await archiveRoomTimeEventInteractor(input, RTErepo);
			return a;
		}),

	getSchedule: t.procedure.input(z.string()).query(async ({ input }) => {
		let roomTimeEvent = await getRoomTimeEventInteractor(RTErepo, input);
		return roomTimeEvent;
	}),

	listAllSchedules: t.procedure.query(async () => {
		let roomTimeEvents = await listRoomTimeEventsInteractor(RTErepo);
		return roomTimeEvents as RoomTimeEventEntity[];
	}),

	listSchedules: t.procedure.input(z.string()).query(async ({ input }) => {
		let roomTimeEvent = await listAssociatedRoomTimeEventsInteractor(
			repo,
			input
		);
		return roomTimeEvent;
	}),

	updateSchedule: t.procedure
		.input(
			z.object({
				id: z.string(),
				dateStart: z.string().optional(),
				dateEnd: z.string().optional(),
				eventId: z.string().optional(),
				roomId: z.string().optional(),
				status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
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
				eventId: input.eventId,
				roomId: input.roomId,
				status: input.status,
			};
			let updatedRoomTimeEvent = await updateRoomTimeEventInteractor(
				RTErepo,
				roomTimeEvent
			);
			return updatedRoomTimeEvent;
		}),

	listAssociatedEventUserPresences: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let eventUserPresences = await listAssociatedEventUserPresencesInteractor(
				RTErepo,
				input
			);
			return eventUserPresences;
		}),
});
