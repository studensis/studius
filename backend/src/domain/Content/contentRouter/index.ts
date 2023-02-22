import { z } from 'zod';
import {
	adminProcedure,
	publicProcedure,
} from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import { paginationObj } from '../../pagination/paginationObj';
import createContentInteractor from '../interactors/createContentInteractor';
import deleteContentInteractor from '../interactors/deleteContentInteractor';
import getContentInteractor from '../interactors/getContentInteractor';
import listContentsInteractor from '../interactors/listContentsInteractor';
import listPaginatedContentInteractor from '../interactors/listPaginatedContentInteractor';
import updateContentInteractor from '../interactors/updateContentInteractor';
import { ContentEntity } from '../model/ContentEntity';
import { updateContentEntity } from '../model/updateContentEntity';
import ContentRepositoryPrisma from '../repository/ContentRepositoryPrisma';

let repo = new ContentRepositoryPrisma();

export default t.router({
	createContent: adminProcedure
		.input(
			z.object({
				markdownText: z.string(),
				plainText: z.string(),
				date: z.string().optional(),
				linkedEntity: z.enum(['USER', 'SUBJECT', 'SEMINAR', 'POST']),
				linkedEntityId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let content: ContentEntity = {
				...input,
				id: '',
				date: input.date ? new Date(Date.parse(input.date)) : null,
				linkedEntity: input.linkedEntity,
			};
			let newContent = await createContentInteractor(repo, content);
			return newContent;
		}),

	deleteContentById: adminProcedure
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deleteContentInteractor(input, repo);
			return a;
		}),

	getContentById: publicProcedure.input(z.string()).query(async ({ input }) => {
		let content = await getContentInteractor(repo, input);
		return content;
	}),

	listContents: publicProcedure.query(async () => {
		let contents = await listContentsInteractor(repo);
		return contents as ContentEntity[];
	}),

	updateContentById: publicProcedure
		.input(
			z.object({
				id: z.string(),
				markdownText: z.string().optional(),
				plainText: z.string().optional(),
				date: z.date().optional(),
				linkedEntity: z.enum(['USER', 'SUBJECT', 'SEMINAR', 'POST']).optional(),
				linkedEntityId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let content: updateContentEntity = { ...input };
			let updatedContent = await updateContentInteractor(repo, content);
			return updatedContent;
		}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedContentInteractor(repo, input);
		return response;
	}),
});
