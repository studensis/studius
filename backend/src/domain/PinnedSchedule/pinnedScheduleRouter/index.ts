import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createPinnedScheduleInteractor from '../interactors/createPinnedScheduleInteractor';
import deletePinnedScheduleInteractor from '../interactors/deletePinnedScheduleInteractor';
import getPinnedScheduleInteractor from '../interactors/getPinnedScheduleInteractor';
import listPinnedSchedulesInteractor from '../interactors/listPinnedSchedulesInteractor';
import updatePinnedScheduleInteractor from '../interactors/updatePinnedScheduleInteractor';
import { PinnedScheduleEntity } from '../model/PinnedScheduleEntity';
import PinnedScheduleRepositoryPrisma from '../repository/PinnedScheduleRepositoryPrisma';

let repo = new PinnedScheduleRepositoryPrisma();

export default t.router({
	createPinnedSchedule: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				scheduleId: z.string(),
				subjectId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedSchedule: PinnedScheduleEntity = {
				...input,
				id: '',
			};
			let newPinnedSchedule = await createPinnedScheduleInteractor(
				repo,
				pinnedSchedule
			);
			return newPinnedSchedule;
		}),

	deletePinnedScheduleById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deletePinnedScheduleInteractor(input, repo);
			return a;
		}),

	getPinnedScheduleById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let pinnedSchedule = await getPinnedScheduleInteractor(repo, input);
			return pinnedSchedule;
		}),

	listPinnedSchedules: t.procedure.query(async () => {
		let pinnedSchedules = await listPinnedSchedulesInteractor(repo);
		return pinnedSchedules as PinnedScheduleEntity[];
	}),

	updatePinnedScheduleById: t.procedure
		.input(
			z.object({
				id: z.string(),
				scheduleId: z.string().optional(),
				subjectId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let pinnedSchedule = { ...input };
			let updatedPinnedSchedule = await updatePinnedScheduleInteractor(
				repo,
				pinnedSchedule
			);
			return updatedPinnedSchedule;
		}),
});
