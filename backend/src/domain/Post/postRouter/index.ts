import { z } from 'zod';
import { isAdmin, publicProcedure } from '../../../controllers/middleware/auth';
import { t } from '../../../controllers/trpc';
import createPostInteractor from '../interactors/createPostInteractor';
import deletePostInteractor from '../interactors/deletePostInteractor';
import getPostInteractor from '../interactors/getPostInteractor';
import listGlobalPostsInteractor from '../interactors/listGlobalPostsInteractor';
import listPaginatedPostsInteractor from '../interactors/listPaginatedPostsInteractor';
import listPostsInteractor from '../interactors/listPostsInteractor';
import updatePostInteractor from '../interactors/updatePostInteractor';
import { PostEntity } from '../model/PostEntity';
import { updatePostEntity } from '../model/updatePostEntity';
import PostRepositoryPrisma from '../repository/PostRepositoryPrisma';

let repo = new PostRepositoryPrisma();

export default t.router({
	createPost: t.procedure
		.use(isAdmin)
		.input(
			z.object({
				title: z.string(),
				date: z.string().optional(),
				linkedEntity: z.enum(['USER', 'SUBJECT', 'ASSIGNMENT', 'POST']),
				linkedEntityId: z.string(),
				contentId: z.string(),
				ownerId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			let post: PostEntity = {
				...input,
				id: '',
				date: input.date ? new Date(Date.parse(input.date)) : null,
			};
			let newPost = await createPostInteractor(repo, post);
			return newPost;
		}),

	deletePostById: t.procedure
		.use(isAdmin)
		.input(z.string())
		.mutation(async ({ input }) => {
			let a = await deletePostInteractor(input, repo);
			return a;
		}),

	getPostById: t.procedure.input(z.string()).query(async ({ input }) => {
		let post = await getPostInteractor(repo, input);
		return post;
	}),

	listPosts: t.procedure.query(async () => {
		let posts = await listPostsInteractor(repo);
		return posts as PostEntity[];
	}),

	listPaginated: t.procedure.input(paginationObj).query(async ({ input }) => {
		let response = await listPaginatedPostsInteractor(repo, input);
		return response;
	}),

	updatePostById: t.procedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				date: z.string().optional(),
				linkedEntity: z
					.enum(['USER', 'SUBJECT', 'ASSIGNMENT', 'POST'])
					.optional(),
				linkedEntityId: z.string().optional(),
				contentId: z.string().optional(),
				ownerId: z.string().optional(),
			})
		)
		.mutation(async ({ input }) => {
			let post: updatePostEntity = {
				...input,
				date: input.date ? new Date(Date.parse(input.date)) : null,
			};
			let updatedPost = await updatePostInteractor(repo, post);
			return updatedPost;
		}),

	listGlobalPosts: publicProcedure.query(async () => {
		let response = await listGlobalPostsInteractor(repo);
		return response;
	}),
});
