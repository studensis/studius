import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { isAuthed } from '../../middleware/auth';
import { t } from '../../trpc';
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

export default t.router({
	listPosts: t.procedure.query(() => posts),

	createPost: t.procedure
		.use(isAuthed)
		.input(z.object({ text: z.string() }))
		.mutation(({ input }) => {
			console.log('This is Input:');
			console.log(input);

			const post: Post = {
				id: ++last_id,
				title: input.text ? input.text : 'undefined title',
				createdAt: Date.now(),
				updatedAt: Date.now(),
			};
			posts.push(post);
			return post;
		}),

	postById: t.procedure.input(z.number()).query(({ input }) => {
		if (input >= last_id) {
			console.log('too big');
			throw new TRPCError({ code: 'NOT_FOUND' });
		}
		return posts[input];
	}),
});
