/* eslint-disable jsx-a11y/alt-text */
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import Icon, { IconName } from './Icon';

const SidebarItem: FC<{
	icon: IconName;
	href?: string;
	onClick?: () => void;
}> = ({ href, icon, onClick }) => {
	return (
		<>
			<Link passHref href={href}>
				<li
					className=" flex justify-center items-center bg-white p-3 rounded-xl my-1 hover:bg-light-accent active:bg-light-accent transition-all ease-in duration-200 cursor-pointer group"
					onClick={onClick}>
					<a href="">
						<Icon
							icon={icon}
							className="flex justify-center items-center group-hover:bg-special-white bg-black"
						/>
					</a>
				</li>
			</Link>
		</>
	);
};

export const Sidebar = () => {
	const [iconColor, setIconColor] = useState(true);

	const iconColorHandler = (num: number) => {
		setIconColor(!iconColor);
		setIconNum(num);
	};

	return (
		<div className=" ">
			<div className="h-screen fixed top-0 w-[72px] bg-light-background gap-6 py-4 px-3 shadow-side ">
				<div className="flex flex-col justify-between h-full ">
					<div>
						<Image
							className=""
							src="/./assets/ferLogo.png"
							width={80}
							height={50}
						/>
					</div>
					<div className="flex justify-center">
						<ul className="flex flex-col justify-center">
							<SidebarItem icon={'home'} href={'/'} />
							<SidebarItem icon={'calendar'} href={'/calendar'} />
							<SidebarItem icon={'adminTools'} href={'/workspaceTools'} />
						</ul>
					</div>
					<div className="gap-6">
						<SidebarItem icon={'settings'} href={'/settings'} />
						<SidebarItem icon={'logOut'} href={'/'} onClick={signIn} />
						{/* <div
							className="flex justify-center items-center bg-white p-3 rounded-xl my-3 hover:bg-light-accent active:bg-light-accent transition-all ease-in "
							onMouseEnter={() => {
								iconColorHandler(5);
							}}
							onMouseLeave={() => {
								iconColorHandler(0);
							}}>
							<div
								onClick={() => {
									signIn();
								}}>
								<Icon
									icon="logOut"
									className="flex justify-center items-center"
									color={
										iconNum == 5 ? (iconColor ? 'black' : 'white') : 'black'
									}
								/>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};
