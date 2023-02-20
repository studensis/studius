import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createUserPresenceInteractor from '../interactors/createUserPresenceInteractor';
import deleteUserPresenceInteractor from '../interactors/deleteUserPresenceInteractor';
import getAssociatedScheduleInteractor from '../interactors/getAssociatedScheduleInteractor';
import getUserPresenceInteractor from '../interactors/getUserPresenceInteractor';
import listUserPresencesInteractor from '../interactors/listUserPresencesInteractor';
import updateUserPresenceInteractor from '../interactors/updateUserPresenceInteractor';
import { updateUserPresenceEntity } from '../model/updateUserPresenceEntity';
import { UserPresenceEntity } from '../model/UserPresenceEntity';
import UserPresenceRepositoryPrisma from '../repository/UserPresenceRepositoryPrisma';

let repo = new UserPresenceRepositoryPrisma();

export default t.router({
	createUserPresence: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				presenceStatus: z.boolean(),
				scheduleId: z.string(),
				userId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let userPresence: UserPresenceEntity = {
				...input,
				id: '',
			};
			let newUserPresence = await createUserPresenceInteractor(
				repo,
				userPresence
			);
			return newUserPresence;
		}),

	deleteUserPresenceById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteUserPresenceInteractor(input, repo);
			return a;
		}),

	getUserPresenceById: t.procedure
		.input(z.string())
		.query(async ({ input }) => {
			let userPresence = await getUserPresenceInteractor(repo, input);
			return userPresence;
		}),

	listUserPresences: t.procedure.query(async () => {
		let userPresences = await listUserPresencesInteractor(repo);
		return userPresences as UserPresenceEntity[];
	}),

	updateUserPresenceById: t.procedure
		.input(
			z.object({
				id: z.string(),
				presenceStatus: z.boolean(),
				// scheduleId: z.string().optional(),
				// userId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let userPresence: updateUserPresenceEntity = { ...input };
			let updatedUserPresence = await updateUserPresenceInteractor(
				repo,
				userPresence
			);
			return updatedUserPresence;
		}),

	getSchedule: t.procedure.input(z.string()).query(async ({ input }) => {
		let schedule = await getAssociatedScheduleInteractor(repo, input);
		return schedule;
	}),
});
