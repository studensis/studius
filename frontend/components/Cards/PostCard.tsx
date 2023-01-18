import Link from 'next/link';
import { FC } from 'react';

const PostCard: FC<{ title: string; id: string }> = ({ title, id }) => {
	return (
		<Link href={'/post/' + id}>
			<div className="rounded-xl shadow-sm-bottom border border-accent-medium p-8 mt-2 title3 bg-section text-neutral hover:bg-accent-weak h-full flex flex-col justify-center">
				{title}
				<br />
				<h1 className="body2 text-accent-strong">Pogledaj više</h1>
			</div>
		</Link>
	);
};

export default PostCard;
