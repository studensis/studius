import { initTRPC, TRPCError } from '@trpc/server';
import * as jwt from 'jsonwebtoken';
import { z } from 'zod';
import Context from './trpc_context';

const secret = '3qtv47890hn689n72cdx3049b*&%a';

const trpc = initTRPC.context<Context>().create();

const publicProcedure = trpc.procedure;

let last_id = 0;

type Post = {
	id: number;
	title: string;
	createdAt: number;
	updatedAt: number;
};

let posts: Post[] = [
	{
		id: -1,
		title: 'First Post',
		createdAt: Date.now(),
		updatedAt: Date.now(),
	},
];

const isAuthed = trpc.middleware(({ next, ctx }) => {
	if (!ctx.user || ctx.user === null) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

const postRouter = trpc.router({
	listPosts: publicProcedure.use(isAuthed).query(() => posts),

	createPost: trpc.procedure.input(z.string()).mutation(({ input }) => {
		console.log('This is Input:');
		console.log(input);

		const post: Post = {
			id: ++last_id,
			title: input ? input : 'undefined title',
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		posts.push(post);
		return post;
	}),

	postById: publicProcedure.input(z.number()).query(({ input }) => {
		if (input >= last_id) {
			console.log('too big');
			throw new TRPCError({ code: 'NOT_FOUND' });
		}
		return posts[input];
	}),
});

const isAdmin = trpc.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Please log in.',
		});
	}
	if (ctx.user.role != 'admin' && ctx.user.role != 'superadmin') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Operation not permitted: rank too low.',
		});
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});
const isSuperadmin = trpc.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Please log in.',
		});
	}
	if (ctx.user.role != 'superadmin') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Operation not permitted: rank too low.',
		});
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});

const adminRouter = trpc.router({
	secret: publicProcedure.query(({ ctx }) => {
		if (!ctx.user) {
			throw new TRPCError({ code: 'UNAUTHORIZED' });
		}
		if (ctx.user?.role !== 'admin') {
			throw new TRPCError({ code: 'FORBIDDEN' });
		}
		return {
			secret: 'sauce',
		};
	}),
});

const loginRoutine = publicProcedure.mutation(({ ctx }) => {
	const { password } = ctx.req.body;

	// mock db entry
	const user = {
		userId: 123,
		password: '123456',
		username: 'user',
		role: 'admin',
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

const loginOutRoutine = publicProcedure.mutation(({ ctx }) => {
	ctx.res.clearCookie('token');
	return 'logged out successfully';
});

const meRoutine = publicProcedure.query(({ ctx }) => {
	return ctx.user;
});

// root router to call
const appRouter = trpc.router({
	post: postRouter,
	admin: adminRouter,
	me: meRoutine,
	login: loginRoutine,
	logout: loginOutRoutine,
	test: meRoutine,
});

export default appRouter;
