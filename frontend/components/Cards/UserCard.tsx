import Link from 'next/link';
import { FC } from 'react';
import { Block } from '../@studius/PageElements/Block';

const UserCard: FC<{
	user: {
		id: string;
		firstname: string;
		lastname: string;
	};
	roleTitle: 'STUDENT' | 'PROFESSOR' | 'OWNER' | 'DEMONSTRATOR' | 'ASSISTANT';
	enrolled: boolean;
}> = ({ user, roleTitle, enrolled }) => {
	return (
		<div className="">
			<Link
				href={'/user/' + user.id}
				key={user.id}
				className="border-accent-medium"
			>
				<Block>
					<p className="title1">{user.firstname + ' ' + user.lastname}</p>
					<p className="text-neutral-strong caption">{enrolled && roleTitle}</p>
				</Block>
			</Link>
		</div>
	);
};

export default UserCard;
