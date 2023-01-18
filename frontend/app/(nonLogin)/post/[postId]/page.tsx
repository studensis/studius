'use client';

import { Section } from '../../../../components/@studius/PageElements/Section';
import { trpc } from '../../../../components/hooks/TrpcProvider';

type PageProps = {
	params: {
		postId: string;
	};
};

const page = (props: PageProps) => {
	const post = trpc.post.getPostById.useQuery(props.params.postId).data;

	return (
		<div>
			<Section>
				<h1 className="title1">{post?.title}</h1>
			</Section>
		</div>
	);
};

export default page;
