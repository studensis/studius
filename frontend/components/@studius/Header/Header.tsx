'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLogin from '../../hooks/LoginContext';
import { Button } from '../Button/Button';
import Icon, { IconName } from '../Icon/Icon';

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
					<Icon icon={icon} className={'bg-light-accent'} size={16} />
					<p className="button-small">{title}</p>
				</div>
			</Link>
		</>
	);
};

function Header() {
	const { loggedIn, user, login, logout } = useLogin();

	const router = useRouter();

	return (
		<>
			<>
				<div className="w-full px-6 py-4 flex place-content-between place-items-center">
					<div className="flex gap-2">
						<Link href="/">
							<div className="w-12 h-12 rounded-[16px] bg-black"></div>
						</Link>
						<NavItem
							href="/intranet"
							icon="home"
							title="Homepage"
						/>
						{user &&
							(user.role === 'ADMIN' ||
								user.role === 'SUPERADMIN') && (
								<NavItem
									href="/admin"
									icon="adminTools"
									title="Admin"
								/>
							)}
					</div>
					<div className="flex gap-2">
						<Button
							onClick={() => {
								if (loggedIn) {
									logout();
								} else {
									router.push('/login');
								}
							}}
						>
							{loggedIn ? 'Log Out' : 'Log In'}
						</Button>
						<div className="w-12 h-12 rounded-[16px] bg-black"></div>
					</div>
				</div>
			</>
		</>
	);
}

export default Header;
