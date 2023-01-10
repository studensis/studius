import Link from 'next/link';
import { FC } from 'react';

const SubjectCard: FC<{
	subject: { id: string; title: string; description: string };
}> = ({ subject }) => {
	return (
		<div>
			<Link href={'/subject/' + subject.id} key={subject.id}>
				<div className="p-10 bg-section rounded-3xl h-full">
					<p className="title1">{subject.title}</p>
					<p className="body1 text-neutral-strong">
						{subject.description.substring(0, 80) + '...'}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default SubjectCard;
