/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Student } from '../typings';
import Icon from './Icon';

type TopBarProps = {
	children?: ReactNode | ReactNode[];
	setMenuActive: Function;
	menuActive: boolean;
};

const Topbar: FC<TopBarProps> = ({ setMenuActive, menuActive }) => {
	const [user, setUser] = useState<Student | undefined>(undefined);

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	return (
		<div className="">
			<div className="fixed top-0 h-[78px] left-[72px] right-0   ">
				<div className="flex  justify-between items-center p-4 px-10 rounded ">
					<div className="w-[480px] h-[48px] bg-white rounded-2xl flex justify-center">
						<button className="flex justify-center items-center p-2 pl-4 pt-4">
							<Icon icon="search" />
						</button>
						<input
							type="text"
							placeholder="Search Studensis"
							className="outline-none w-full rounded-2xl"
						/>
					</div>
					<div>
						<ul className="flex items-center justify-center">
							<li className="m-2">
								<Icon icon="settings" />
							</li>
							<li
								onClick={() => {
									setMenuActive(!menuActive);
								}}>
								<Image
									src={user ? user.avatar_url : '/assets/franko.png'}
									height={48}
									width={48}
									className="bg-black rounded-2xl object-cover scale hover:scale-110 "
									//........ ^^^^^^^^  za sad
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Topbar;
