import Link from 'next/link';
import { FC } from 'react';
import Tag from '../@studius/Tag/Tag';

const SubjectCard: FC<{
	subject: { id: string; title: string; description: string };
	role?: string;
}> = ({ subject, role }) => {
	return (
		<div>
			<Link href={'/subject/' + subject.id} key={subject.id}>
				<div className="p-10 bg-section rounded-3xl h-full hover:opacity-60">
					<div className="">
						<p className="title1">{subject.title}</p>
						<p className="body1 text-neutral-strong">
							{subject.description.substring(0, 80) + '...'}
						</p>
						{role && <Tag> {role} </Tag>}
					</div>
				</div>
			</Link>
		</div>
	);
};

export default SubjectCard;
