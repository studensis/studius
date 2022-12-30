import { TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import { t } from '../../trpc';
const secret = '3qtv47890hn689n72cdx3049b*&%a';

export default t.procedure
	.input(
		z.object({
			username: z.string(),
			password: z.string(),
		})
	)
	.mutation(({ ctx, input }) => {
		console.log('login routine');

		const { username, password } = input;
		console.log(password);

		// mock db entry
		const user = {
			userId: 123,
			password: '123456',
			username: 'user',
			role: 'ADMIN',
		};

		console.log(user.password, password);

		if (user.password !== password) {
			throw new TRPCError({
				code: 'FORBIDDEN',
				message: 'Invalid username or password',
			});
		}

		const token = jwt.sign(user, secret, { expiresIn: '1h' });

		ctx.res.cookie('token', token, {
			httpOnly: true,
			// secure: true,
			// signed: true
		});

		return 'logged in successfully';
	});
