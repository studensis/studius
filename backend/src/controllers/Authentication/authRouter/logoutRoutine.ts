import { t } from '../../trpc';

export default t.procedure.mutation(({ ctx }) => {
	ctx.res.clearCookie('token');
	return 'logged out successfully';
});
