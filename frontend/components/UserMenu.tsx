/* eslint-disable jsx-a11y/alt-text */
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Student } from '../typings';
import Icon from './Icon';
import Status from './Status';

type MenuProps = {
	children?: ReactNode | ReactNode[];
	active: boolean;
	setMenuActive: Function;
	menuActive: boolean;
};

const UserMenu: FC<MenuProps> = ({ active, setMenuActive, menuActive }) => {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);

	// UZIMANJE IZ SESSION NAME-A

	// useEffect(() => {
	//   if (data) {
	//     setUser(JSON.parse(data.user.name));
	//   }
	// }, [data]);

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	const logOutHandler = async (e) => {
		e.preventDefault();
		sessionStorage.clear();
		const res = await signOut({
			callbackUrl: '/'
		});
	};

	if (status == 'authenticated') {
		return (
			<div className={active ? 'z-10' : 'hidden'}>
				<div className="z-10 bg-white w-[360px] shadow-2xl fixed top-[80px] bottom-[630px] right-4 rounded-2xl  ">
					<div className="pt-6 gap-4 w-[360px] flex justify-center items-center flex-col ">
						<div className="justify-between flex ">
							<Image
								src={user?.avatar_url ? user.avatar_url : '/assets/franko.png'}
								width={48}
								height={48}
								className="rounded-2xl "
							/>
							<div className="px-10">
								<h1 className="title1 ">{user?.name + ' ' + user?.surname}</h1>
								<Status color="blue">Student</Status>
							</div>
							<p
								onClick={() => {
									setMenuActive(!menuActive);
								}}
								className="title1 cursor-pointer">
								x
							</p>
						</div>
						<div className="w-[360px] px-6 ">
							<div className="flex flex-col justify-start items-start ">
								<div className="flex flex-col justify-start items-start">
									<Link
										href={{
											pathname: '/userpage'
										}}>
										<div className="flex justify-center items-center p-2 cursor-pointer ">
											<Icon icon="user" className="bg-light-accent" />
											<p className="text-light-accent title3 ">View Profile</p>
										</div>
									</Link>
									<div className="flex justify-center items-center p-2">
										<Icon icon="settings" className="bg-light-accent" />
										<p className="text-light-accent title3 ">Settings</p>
									</div>
									<div
										onClick={logOutHandler}
										className="cursor-pointer flex justify-center items-center p-2">
										<Icon icon="logOut" className="bg-yellow-500" />
										<p className="text-yellow-400 title3 ">Log out</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default UserMenu;
