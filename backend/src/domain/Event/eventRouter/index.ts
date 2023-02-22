import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import PinnedScheduleRepositoryPrisma from '../../PinnedSchedule/repository/PinnedScheduleRepositoryPrisma';
import archiveScheduleInteractor from '../../Schedule/interactors/archiveScheduleInteractor';
import createScheduleInteractor from '../../Schedule/interactors/createScheduleInteractor';
import deletePinnedScheduleByScheduleIdInteractor from '../../Schedule/interactors/deletePinnedScheduleByScheduleIdInteractor';
import deleteScheduleInteractor from '../../Schedule/interactors/deleteScheduleInteractor';
import deleteUserPresenceByScheduleIdInteractor from '../../Schedule/interactors/deleteUserPresenceByScheduleIdInteractor';
import getScheduleInteractor from '../../Schedule/interactors/getScheduleInteractor';
import listAssociatedUserPresencesInteractor from '../../Schedule/interactors/listAssociatedUserPresencesInteractor';
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

import deleteScheduleByEventIdInteractor from '../interactors/deleteScheduleByEventIdInteractor';
import getEventInteractor from '../interactors/getEventInteractor';
import listAssociatedSchedulesInteractor from '../interactors/listAssociatedSchedulesInteractor';
import listEventsInteractor from '../interactors/listEventsInteractor';
import updateEventInteractor from '../interactors/updateEventInteractor';
import { EventEntity } from '../model/EventEntity';
import { updateEventEntity } from '../model/updateEventEntity';
import EventRepositoryPrisma from '../repository/EventRepositoryPrisma';

let repo = new EventRepositoryPrisma();
let Schedulerepo = new ScheduleRepositoryPrisma();
let EUPrepo = new UserPresenceRepositoryPrisma();
let pinnedScheduleRepo = new PinnedScheduleRepositoryPrisma();

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
			let b = await deleteScheduleByEventIdInteractor(input, Schedulerepo);
			// vise ne postoji jer je sad PinnedSchedule linkan za Schedule, ne Event
			// let c = await deletePinnedScheduleByEventIdInteractor(
			// 	input,
			// 	pinnedScheduleRepo
			// );
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
			let b = await archiveScheduleByEventIdInteractor(input, Schedulerepo);
			let a = await archiveEventInteractor(input, repo);
			return a;
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
			let c = await deletePinnedScheduleByScheduleIdInteractor(
				input,
				pinnedScheduleRepo
			);
			let b = await deleteUserPresenceByScheduleIdInteractor(input, EUPrepo);
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
