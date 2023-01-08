'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../@studius/Button/Button';
import Icon, { IconName } from '../@studius/Icon/Icon';
import useModal from '../@studius/Modal/ModalProvider';
import useLogin from '../hooks/LoginContext';
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

function Header() {
	const { user, loggedIn } = useLogin();
	const { setSidebar } = useModal();

	const router = useRouter();

	return (
		<>
			<div className="fixed top-0 w-full px-6 py-4 flex place-content-between place-items-center">
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
					<NavItem href="/intranet" icon="home" title="Homepage" />
					<NavItem href="/calendar" icon="calendar" title="Events" />
					{user && (user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
						<NavItem href="/admin" icon="adminTools" title="Workspace Tools" />
					)}
				</div>
				<div className="flex gap-2">
					{loggedIn ? (
						<div
							className="w-12 h-12 rounded-[16px] bg-neutral-medium"
							onClick={() => {
								setSidebar(<MainSidebar />);
							}}
						></div>
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
