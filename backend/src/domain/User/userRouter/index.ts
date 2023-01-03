import { z } from 'zod';
import { isAdmin } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createUserInteractor from '../interactors/createUserInteractor';
import deleteUserInteractor from '../interactors/deleteUserInteractor';
import getUserInteractor from '../interactors/getUserInteractor';
import listUsersInteractor from '../interactors/listUsersInteractor';
import updateUserInteractor from '../interactors/updateUserInteractor';
import UserRepositoryPrisma from '../repository/UserRepositoryPrisma';
import {UserEntity} from '../UserEntity';
import {updateUserEntity} from '../updateUserEntity';


let repo = new UserRepositoryPrisma();

export default t.router({
	createUser: t.procedure
		.use(isAdmin)
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
			let user:UserEntity = {
				...input,
				id: '',
				jmbag: input.jmbag || null,
				userRole: input.userRole || 'DEFAULT',
				mentorID: input.mentorID || null,
			}
			let newUser = await createUserInteractor(repo, user);
			return newUser;
		}),

	deleteUserById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteUserInteractor(input, repo);
			return a;
		}),

	getUserById: t.procedure.input(z.string()).query(async ({ input }) => {
		let user = await getUserInteractor(repo, input);
		return user;
	}),

	listUsers: t.procedure.query(async () => {
		let users = await listUsersInteractor(repo);
		return users as UserEntity[];
	}),

	updateUser: t.procedure
		.input(
			z.object({
				id: z.string(),
				firstname: z.string().optional(),
				lastname: z.string().optional(),
				password: z.string().optional(),
				jmbag: z.string().optional(),
				email: z.string().optional(),
				userRole: z.enum(['DEFAULT', 'ADMIN', 'SUPERADMIN']).optional(),
				mentorID: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let user:updateUserEntity = {...input};
			let updatedUser = await updateUserInteractor(repo, user);
			return updatedUser;
		}),
});
