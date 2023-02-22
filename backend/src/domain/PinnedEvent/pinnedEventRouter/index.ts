import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { paginationObj } from '../../pagination/paginationObj';
import createpinnedScheduleInteractor from '../interactors/createpinnedScheduleInteractor';
import deletepinnedScheduleInteractor from '../interactors/deletepinnedScheduleInteractor';
import getpinnedScheduleInteractor from '../interactors/getpinnedScheduleInteractor';
import listPaginatedpinnedSchedulesInteractor from '../interactors/listPaginatedpinnedSchedulesInteractor';
import listpinnedSchedulesInteractor from '../interactors/listpinnedSchedulesInteractor';
import updatepinnedScheduleInteractor from '../interactors/updatepinnedScheduleInteractor';
import { pinnedScheduleEntity } from '../model/pinnedScheduleEntity';
import pinnedScheduleRepositoryPrisma from '../repository/pinnedScheduleRepositoryPrisma';

let repo = new pinnedScheduleRepositoryPrisma();

export default t.router({
	createpinnedSchedule: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				eventId: z.string(),
				subjectId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedSchedule: pinnedScheduleEntity = {
				...input,
				id: '',
			};
			let newpinnedSchedule = await createpinnedScheduleInteractor(
				repo,
				pinnedSchedule
			);
			return newpinnedSchedule;
		}),

	deletepinnedScheduleById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deletepinnedScheduleInteractor(input, repo);
			return a;
		}),

	getpinnedScheduleById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let pinnedSchedule = await getpinnedScheduleInteractor(repo, input);
			return pinnedSchedule;
		}),

	listpinnedSchedules: t.procedure.query(async () => {
		let pinnedSchedules = await listpinnedSchedulesInteractor(repo);
		return pinnedSchedules as pinnedScheduleEntity[];
	}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedpinnedSchedulesInteractor(repo, input);
		return response;
	}),

	updatepinnedScheduleById: t.procedure
		.input(
			z.object({
				id: z.string(),
				assignmentId: z.string().optional(),
				subjectId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedSchedule = { ...input };
			let updatedpinnedSchedule = await updatepinnedScheduleInteractor(
				repo,
				pinnedSchedule
			);
			return updatedpinnedSchedule;
		}),
});
