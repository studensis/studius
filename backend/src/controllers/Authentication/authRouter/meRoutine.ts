import { t } from '../../trpc';

export default t.procedure.query(({ ctx }) => {
	return ctx.user;
});
