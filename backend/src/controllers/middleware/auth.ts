import { TRPCError } from '@trpc/server';
import { t } from '../trpc';

export const isAdmin = t.middleware(({ next, ctx }) => {
	if (!ctx.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'Please log in.',
		});
	}
	if (ctx.user.role != 'ADMIN' && ctx.user.role != 'SUPERADMIN') {
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

export const isSuperadmin = t.middleware(({ next, ctx }) => {
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

export const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.user || ctx.user === null) {
		throw new TRPCError({ code: 'UNAUTHORIZED' });
	}
	return next({
		ctx: {
			user: ctx.user,
		},
	});
});
