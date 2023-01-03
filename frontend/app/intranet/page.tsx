'use client';

import { trpc } from '../../components/hooks/TrpcProvider';

export default function Intranet() {
	const posts = trpc.postExample.listPosts.useQuery();
	const createPost = trpc.postExample.createPost.useMutation();

	return (
		<>
			<h2 className="title1"> TRPC Posts: </h2>
			<button
				className="p-4 bg-red-500"
				onClick={() => {
					createPost.mutate({ text: 'TEST STRING' });
				}}
			>
				Test
			</button>
			{JSON.stringify(posts.data)}
			{posts.isSuccess &&
				posts.data.map((post) => {
					return (
						<div key={post.id} className="post">
							<p className="title3">{post.title}</p>
							<p>{post.id}</p>
						</div>
					);
				})}
			<div>
				<h1 className="display3">Welcome back!</h1>
			</div>
		</>
	);
}
