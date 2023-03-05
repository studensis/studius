import { z } from 'zod';

const paginationObj = z.object({
	pageNumber: z.number(),
	objectsPerPage: z.number(),
});

type paginationType = z.infer<typeof paginationObj>;
export { paginationType, paginationObj };
