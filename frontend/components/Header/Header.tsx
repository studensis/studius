'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../@studius/Button/Button';
import Icon, { IconName } from '../@studius/Icon/Icon';
import useDialog from '../@studius/Modal/DialogProvider';
import useLogin from '../hooks/LoginContext';
import { trpc } from '../hooks/TrpcProvider';
import MainSidebar from '../Sidebars/MainSidebar';

const NavItem = ({
	href,
	icon,
	title,
}: {
	href: string;
	icon: IconName;
	title: string;
}) => {
	return (
		<>
			<Link href={href}>
				<div className="p-4 flex gap-1">
					<Icon icon={icon} className={'bg-accent'} size={16} />
					<p className="button-small">{title}</p>
				</div>
			</Link>
		</>
	);
};

export const ProfileImage = ({ id }: { id: string }) => {
	const userInfo = trpc.user.getUserById.useQuery(id);

	const [url, setUrl] = useState(
		'https://pbs.twimg.com/media/BgDURSWIQAA-d32.jpg'
	);

	useEffect(() => {
		if (userInfo.isSuccess) {
			userInfo.data!.avatar && setUrl(userInfo.data!.avatar);
		}
	}, [userInfo]);

	return (
		<>
			<img
				src={url}
				style={{ objectFit: 'cover', objectPosition: 'center' }}
				className="absolute top-[50%] -translate-y-[50%]"
				alt=""
			/>
		</>
	);
};

function Header() {
	const { user, loggedIn } = useLogin();
	const { setSidebar } = useDialog();

	const router = useRouter();

	return (
		<>
			<div className="fixed top-0 w-full px-6 py-4 flex place-content-between place-items-center from-background to-background\0 bg-gradient-to-b">
				<div className="flex gap-2">
					<Link href="/">
						<div className="relative w-12 h-12 rounded-[16px] bg-neutral-medium">
							<Image
								src={'/assets/FER/logo.png'}
								fill
								style={{ objectFit: 'contain' }}
								alt=""
							/>
						</div>
					</Link>
					<div className="hidden md:flex">
						<NavItem href="/intranet" icon="home" title="Homepage" />
						{/* <NavItem href="/calendar" icon="calendar" title="Assignments" /> */}
						<NavItem href="/seminars" icon="lessons" title="Seminars" />
						{user && (user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
							<>
								<div className="py-2 h-full mx-2">
									<div className="w-px h-full bg-neutral-medium"></div>
								</div>
								<NavItem
									href="/admin"
									icon="adminTools"
									title="Workspace Tools"
								/>
							</>
						)}
					</div>
				</div>
				<div className="flex gap-2">
					{loggedIn ? (
						<div className="flex">
							<NavItem href={'/'} icon={'notifications'} title={''} />
							<div
								className="relative w-12 h-12 rounded-[16px] bg-neutral-medium overflow-hidden"
								onClick={() => {
									setSidebar(<MainSidebar />);
								}}
							>
								{user && user.userId ? (
									<ProfileImage id={user.userId} />
								) : (
									<Image
										src={'https://pbs.twimg.com/media/BgDURSWIQAA-d32.jpg'}
										fill
										style={{ objectFit: 'cover' }}
										alt=""
									/>
								)}
							</div>
						</div>
					) : (
						<>
							<Button
								onClick={() => {
									router.push('/login');
								}}
							>
								Log in
							</Button>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Header;
