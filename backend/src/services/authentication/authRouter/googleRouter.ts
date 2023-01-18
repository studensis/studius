import { TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken';
import { decode } from 'jsonwebtoken';
import { z } from 'zod';
import {
	authedProcedure,
	publicProcedure,
} from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import UserRepositoryPrisma from '../../../domain/User/repository/UserRepositoryPrisma';
const secret = '3qtv47890hn689n72cdx3049b*&%a';

const repo = new UserRepositoryPrisma();

export const googleRouter = t.router({
	login: publicProcedure
		.input(z.object({ credential: z.string() }))
		.mutation(async ({ input, ctx }) => {
			let googleUserId = decode(input.credential)!.sub as string;
			let user = await repo.getByGoogleId(googleUserId);
			if (user === null) {
				throw new TRPCError({
					code: 'NOT_FOUND',
					message: 'No user is linked with this Google account',
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
		}),
	link: authedProcedure
		.input(z.object({ credential: z.string() }))
		.mutation(async ({ input, ctx }) => {
			let googleUserId = decode(input.credential)!.sub as string;
			let { userId } = ctx.user;
			let user = await repo.getById(userId);
			if (user) {
				let updatedUser = await repo.update({
					...user,
					id: userId,
					googleUserId: googleUserId,
				});
				return updatedUser;
			} else {
				throw new TRPCError({ message: '', code: 'INTERNAL_SERVER_ERROR' });
			}
		}),
});
