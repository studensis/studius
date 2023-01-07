import { publicProcedure } from '../../middleware/auth';

export default publicProcedure.query(({ ctx }) => {
	return ctx.user;
});
