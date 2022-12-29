import { z } from 'zod';
import { t } from '../../../controllers/trpc';
import createUserInteractor from '../interactors/createUserInteractor';
import listUsersInteractor from '../interactors/listUsersInteractor';
import updateUserInteractor from '../interactors/updateUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';
import UserEntity from '../UserEntity';

let repo = new UserRepositoryPrisma();

export default t.router({
	createUser: t.procedure
		.input(
			z.object({
				// id: z.string(),
				firstname: z.string(),
				lastname: z.string(),
				password: z.string(),
				jmbag: z.string().optional(),
				email: z.string(),
				userRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']).optional(),
				mentorID: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let user = new UserEntity({
				...input,
				id: '',
				jmbag: input.jmbag || null,
				userRole: input.userRole || 'DEFAULT',
				mentorID: input.mentorID || null,
			});
			let newUser = await createUserInteractor(repo, user);
			return newUser;
		}),

	deleteUserById: t.procedure.mutation(() => {
		return 'TODO';
	}),

	getUserById: t.procedure.query(() => {
		return 'TODO';
	}),

	listUsers: t.procedure.query(async () => {
		let users = await listUsersInteractor(repo);
		return users;
	}),

	updateUser: t.procedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string(),
				lastname: z.string(),
				password: z.string(),
				jmbag: z.string(),
				email: z.string(),
				userRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']),
				mentorID: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let user = new UserEntity(input);
			let updatedUser = await updateUserInteractor(repo, user);
			return updatedUser;
		}),
});
