// import { z } from 'zod';
// import { t } from '../../../controllers/trpc';
// import createScheduleInteractor from '../interactors/createScheduleInteractor';
// import deleteScheduleInteractor from '../interactors/deleteScheduleInteractor';
// import getScheduleInteractor from '../interactors/getScheduleInteractor';
// import listUserPresencesInteractor from '../interactors/listAssociatedUserPresencesInteractor';
// import listSchedulesInteractor from '../interactors/listSchedulesInteractor';
// import updateScheduleInteractor from '../interactors/updateScheduleInteractor';
// import { ScheduleEntity } from '../model/ScheduleEntity';
// import { updateScheduleEntity } from '../model/updateScheduleEntity';
// import ScheduleRepositoryPrisma from '../repository/ScheduleRepositoryPrisma';

// let repo = new ScheduleRepositoryPrisma();

// export default t.router({
// 	createSchedule: t.procedure
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
// 			let schedule: ScheduleEntity = {
// 				...input,
// 				id: '',
// 				dateStart: new Date(Date.parse(input.dateStart)),
// 				dateEnd: new Date(Date.parse(input.dateEnd)),
// 				eventId: input.eventId,
// 				roomId: input.roomId,
// 				status: input.status,
// 			};
// 			let newSchedule = await createScheduleInteractor(
// 				repo,
// 				schedule
// 			);
// 			return newSchedule;
// 		}),

// 	deleteScheduleById: t.procedure
// 		//.use(isAdmin)
// 		.input(z.string())
// 		.mutation(async ({ input }) => {
// 			let a = await deleteScheduleInteractor(input, repo);
// 			return a;
// 		}),

// 	getScheduleById: t.procedure
// 		.input(z.string())
// 		.query(async ({ input }) => {
// 			let schedule = await getScheduleInteractor(repo, input);
// 			return schedule;
// 		}),

// 	listSchedules: t.procedure.query(async () => {
// 		let schedules = await listSchedulesInteractor(repo);
// 		return schedules as ScheduleEntity[];
// 	}),

// 	updateScheduleById: t.procedure
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
// 			let schedule: updateScheduleEntity = {
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
// 			let updatedSchedule = await updateScheduleInteractor(
// 				repo,
// 				schedule
// 			);
// 			return updatedSchedule;
// 		}),

// 	listUserPresences: t.procedure
// 		.input(z.string())
// 		.query(async ({ input }) => {
// 			let userPresences = await listUserPresencesInteractor(
// 				repo,
// 				input
// 			);
// 			return userPresences;
// 		}),
// });
