import { TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import getUserByEmailInteractor from '../../../domain/User/interactors/getUserByEmailInteractor';
import UserRepositoryPrisma from '../../../domain/User/repository/UserRepositoryPrisma';
import { publicProcedure } from '../../middleware/auth';
const secret = '3qtv47890hn689n72cdx3049b*&%a';

const userRepo = new UserRepositoryPrisma();
export default publicProcedure
	.input(
		z.object({
			email: z.string(),
			password: z.string(),
		})
	)
	.mutation(async ({ ctx, input }) => {
		console.log('login routine');

		const { email, password } = input;
		console.log(password);

		const user = await getUserByEmailInteractor(userRepo, email);

		console.log(user, password);

		if (!user) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'Invalid email or password',
			});
		} else {
			if (user.password !== password) {
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: 'Invalid email or password',
				});
			}

			const token = jwt.sign(
				{
					userId: user.id,
					role: user.userRole,
				},
				secret,
				{ expiresIn: '1h' }
			);

			ctx.res.cookie('token', token, {
				...(process.env.NODE_ENV === 'production' && {
					sameSite: 'none',
					secure: true,
				}),
				maxAge: 1000 * 60 * 60, // 1h
			});

			return 'logged in successfully';
		}
	});
