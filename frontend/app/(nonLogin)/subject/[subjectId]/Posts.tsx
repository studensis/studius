'use client';

import Link from 'next/link';
import Icon from '../../../../components/@studius/Icon/Icon';
import { Block } from '../../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../../components/@studius/PageElements/SectionTop';
import { Stack } from '../../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../../components/hooks/TrpcProvider';

export const Posts = ({ subjectId }: { subjectId: string }) => {
	const posts = trpc.subject.getSubjectPosts.useQuery(subjectId);

	const getTimeString = (s: string) => {
		let date: Date = new Date(s);
		return date.toLocaleTimeString();
	};
	const getDateString = (s: string) => {
		let date: Date = new Date(s);
		return date.toLocaleDateString();
	};

	return (
		<>
			{posts.data && posts.data.length > 0 && (
				<>
					<div>
						<SectionTop>
							<h3 className="title2 flex gap-1">
								<Icon icon="statusInfo" /> Posts
							</h3>
						</SectionTop>
						<Stack cols={3}>
							{posts.data.map((post) => (
								<>
									<Link href={`/event/${post.id}`}>
										<Block className="hover:opacity-60">
											<p className="title3">{post.title}</p>
											<br></br>
											<p className="body3 text-neutral-strong">
												{getTimeString(post.date ? post.date : '')}
											</p>
											<p className="body3 text-neutral-strong">
												{getDateString(post.date ? post.date : '')}
											</p>
											<br></br>
											<p className="body3 text-neutral-strong">
												{post.ownerId}
											</p>
										</Block>
									</Link>
								</>
							))}
						</Stack>
					</div>
				</>
			)}
		</>
	);
};
