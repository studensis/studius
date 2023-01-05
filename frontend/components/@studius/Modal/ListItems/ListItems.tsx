import { MouseEventHandler } from 'react';
import { trpc } from '../../../hooks/TrpcProvider';
import Icon, { IconName } from '../../Icon/Icon';
import Tag from '../../Tag/Tag';

export default {
	Profile: ({ userId }: { userId: string }) => {
		const user = trpc.user.getUserById.useQuery(userId);
		return (
			<>
				<div className="p-6 flex gap-4">
					<div className="w-12 h-12 rounded-2xl bg-neutral"></div>
					<div className="flex flex-col">
						<p className="title1 text-neutral">
							{user.data?.firstname} {user.data?.lastname}
						</p>
						<div className="w-full">
							<Tag>{user.data?.userRole}</Tag>
						</div>
					</div>
				</div>
			</>
		);
	},
	Action: ({
		text,
		onClick,
		icon,
	}: {
		text: string;
		onClick: MouseEventHandler<HTMLDivElement>;
		icon: IconName;
	}) => {
		return (
			<>
				<div
					className="px-6 py-4 rounded-lg flex gap-4 hover:bg-accent-weak cursor-pointer"
					onClick={onClick}
				>
					<div className="flex flex-row gap-2">
						<span>
							<Icon icon={icon} className="bg-accent" />
						</span>
						<p className="button-large text-accent">{text}</p>
					</div>
				</div>
			</>
		);
	},
};
