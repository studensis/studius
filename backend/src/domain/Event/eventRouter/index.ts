import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { paginationObj } from '../../pagination/paginationObj';
import PinnedEventRepositoryPrisma from '../../PinnedEvent/repository/PinnedEventRepositoryPrisma';
import archiveScheduleInteractor from '../../Schedule/interactors/archiveScheduleInteractor';
import createScheduleInteractor from '../../Schedule/interactors/createScheduleInteractor';
import deleteScheduleInteractor from '../../Schedule/interactors/deleteScheduleInteractor';
import deleteUserPresenceByScheduleIDInteractor from '../../Schedule/interactors/deleteUserPresenceByScheduleIdInteractor';
import getScheduleInteractor from '../../Schedule/interactors/getScheduleInteractor';
import listAssociatedUserPresencesInteractor from '../../Schedule/interactors/listAssociatedUserPresencesInteractor';
import listPaginatedSchedulesInteractor from '../../Schedule/interactors/listPaginatedSchedulesInteractor';
import listSchedulesInteractor from '../../Schedule/interactors/listSchedulesInteractor';
import updateScheduleInteractor from '../../Schedule/interactors/updateScheduleInteractor';
import { ScheduleEntity } from '../../Schedule/model/ScheduleEntity';
import { updateScheduleEntity } from '../../Schedule/model/updateScheduleEntity';
import ScheduleRepositoryPrisma from '../../Schedule/repository/ScheduleRepositoryPrisma';
import UserPresenceRepositoryPrisma from '../../UserPresence/repository/UserPresenceRepositoryPrisma';
import archiveEventInteractor from '../interactors/archiveEventInteractor';
import archiveScheduleByEventIdInteractor from '../interactors/archiveScheduleByEventIdInteractor';
import createEventInteractor from '../interactors/createEventInteractor';
import deleteEventInteractor from '../interactors/deleteEventInteractor';
import deletePinnedEventByEventIdInteractor from '../interactors/deletePinnedEventByEventIdInteractor';
import deleteScheduleByEventIdInteractor from '../interactors/deleteScheduleByEventIdInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listAssociatedSchedulesInteractor from '../interactors/listAssociatedSchedulesInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import listPaginatedEventsInteractor from '../interactors/listPaginatedEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

let repo = new EventRepositoryPrisma();
let Schedulerepo = new ScheduleRepositoryPrisma();
let EUPrepo = new UserPresenceRepositoryPrisma();
let pinnedEventRepo = new PinnedEventRepositoryPrisma();

export default t.router({
	createEvent: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				linkedEntity: z.enum(['USER', 'SUBJECT', 'ASSIGNMENT', 'POST']),
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
			let b = await deleteScheduleByEventIdInteractor(input, Schedulerepo);
			let c = await deletePinnedEventByEventIdInteractor(
				input,
				pinnedEventRepo
			);
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
					.enum(['USER', 'SUBJECT', 'ASSIGNMENT', 'POST'])
					.optional(),
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
			let b = await archiveScheduleByEventIdInteractor(input, Schedulerepo);
			let a = await archiveEventInteractor(input, repo);
			return a;
		}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedEventsInteractor(repo, input);
		return response;
	}),
	//
	//
	//
	//	Schedule CRUD
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
			let schedule: ScheduleEntity = {
				...input,
				id: '',
				dateStart: new Date(Date.parse(input.dateStart)),
				dateEnd: new Date(Date.parse(input.dateEnd)),
				eventId: input.eventId,
				roomId: input.roomId,
				status: input.status,
			};
			let newSchedule = await createScheduleInteractor(Schedulerepo, schedule);
			return newSchedule;
		}),

	deleteSchedule: t.procedure
		//.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let b = await deleteUserPresenceByScheduleIDInteractor(input, EUPrepo);
			let a = await deleteScheduleInteractor(input, Schedulerepo);
			return a;
		}),

	archiveSchedule: t.procedure
		//.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await archiveScheduleInteractor(input, Schedulerepo);
			return a;
		}),

	getSchedule: t.procedure.input(z.string()).query(async ({ input }) => {
		let schedule = await getScheduleInteractor(Schedulerepo, input);
		return schedule;
	}),

	listAllSchedules: t.procedure.query(async () => {
		let schedules = await listSchedulesInteractor(Schedulerepo);
		return schedules;
	}),
	listPaginatedSchedules: t.procedure
		.input(paginationObj)
		.query(async ({ input }) => {
			let response = await listPaginatedSchedulesInteractor(
				Schedulerepo,
				input
			);
			return response;
		}),

	listSchedules: t.procedure.input(z.string()).query(async ({ input }) => {
		let schedule = await listAssociatedSchedulesInteractor(repo, input);
		return schedule;
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
			let schedule: updateScheduleEntity = {
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
			let updatedSchedule = await updateScheduleInteractor(
				Schedulerepo,
				schedule
			);
			return updatedSchedule;
		}),

	listAssociatedUserPresences: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let userPresences = await listAssociatedUserPresencesInteractor(
				Schedulerepo,
				input
			);
			return userPresences;
		}),
});
