import Link from 'next/link';
import { FC } from 'react';
import { Block } from '../@studius/PageElements/Block';

const UserCard: FC<{
	user: { id: string; firstname: string; lastname: string };
}> = ({ user }) => {
	return (
		<Link href={'/user/' + user.id} key={user.id}>
			<Block>
				<p className="title1">{user.firstname + ' ' + user.lastname}</p>
				<p className="text-neutral-strong caption">{user.id}</p>
			</Block>
		</Link>
	);
};

export default UserCard;
