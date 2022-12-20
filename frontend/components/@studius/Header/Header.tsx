'use client';

import Link from 'next/link';
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

function Header(props) {
	let { loggedIn, logIn, logOut, loginRole } = useLogin();
	return (
		<>
			{loggedIn ? (
				<>
					<div className="w-full px-6 py-4 flex place-content-between place-items-center">
						<div className="flex gap-2">
							<Link href="/">
								<div className="w-12 h-12 rounded-[16px] bg-black"></div>
							</Link>
							<div className="w-[240px] h-12 rounded-[16px] bg-light-section"></div>
						</div>
						<div className="flex gap-10">
							<NavItem
								href="/intranet"
								icon="home"
								title="Homepage"
							/>
							{loginRole === 'admin' && (
								<NavItem
									href="/admin"
									icon="adminTools"
									title="Admin"
								/>
							)}
							<NavItem
								href="/user"
								icon="users"
								title="User List"
							/>
							<NavItem
								href="/calendar"
								icon="calendar"
								title="Calendar"
							/>
						</div>
						<div className="flex gap-2">
							<Button
								onClick={() => {
									logOut();
								}}
							>
								Log Out
							</Button>
							<div className="w-12 h-12 rounded-[16px] bg-black"></div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default Header;
