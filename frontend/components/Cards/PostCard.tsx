import Link from 'next/link';
import { FC } from 'react';

const PostCard: FC<{ title: string; id: string }> = ({ title, id }) => {
	return (
		<div className="rounded-xl border-2 shadow-xl p-5 mt-2 title1 ">
			{title}
			<br />
			<Link href={'/post/' + id}>
				<h1 className="body2 text-accent-strong">Pogledaj više</h1>
			</Link>
		</div>
	);
};

export default PostCard;
