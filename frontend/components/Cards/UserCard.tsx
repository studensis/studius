import Link from 'next/link';
import { FC } from 'react';
import { Block } from '../@studius/PageElements/Block';
import Tag from '../@studius/Tag/Tag';

const UserCard: FC<{
	user: { id: string; firstname: string; lastname: string };
	role?: string;
}> = ({ user, role }) => {
	return (
		<Link href={'/user/' + user.id} key={user.id}>
			<Block>
				<p className="title1">{user.firstname + ' ' + user.lastname}</p>
				<p className="text-neutral-strong caption">{user.id}</p>
				{role && <Tag>{role}</Tag>}
			</Block>
		</Link>
	);
};

export default UserCard;
