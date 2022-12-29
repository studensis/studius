import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

import * as jwt from 'jsonwebtoken';

const secret = '3qtv47890hn689n72cdx3049b*&%a';
export const createContext = async ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => {
	const getUserFromHeader = async () => {
		const token = req.cookies.token;
		try {
			const user = jwt.verify(token, secret) as {
				userId: string;
				role: string;
			};
			const userId = user.userId;
			req.headers.authorization = userId;
			let role = user.role;
			return { userId, role };
		} catch {
			res.clearCookie('token');
			return null;
		}
	};

	const cookie = req.headers.cookie;
	console.log('cookie is:');
	console.log(cookie);

	return {
		req,
		res,
		user: await getUserFromHeader(),
		cookie,
	};
};
type Context = inferAsyncReturnType<typeof createContext>;
export default Context;
