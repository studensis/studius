'use client';

import Link from 'next/link';
import useLogin from '../../hooks/LoginContext';
import { Button } from '../Button/Button';

function Header(props) {
	let { loggedIn, logIn, logOut } = useLogin();
	return (
		<>
			{loggedIn ? (
				<>
					<div className="w-full px-6 py-4 flex place-content-between place-items-center">
						<div className="flex gap-2">
							<Link href="/">
								<div className="w-12 h-12 rounded-[16px] bg-black"></div>
							</Link>
							<div className="w-[480px] h-12 rounded-[16px] bg-light-section"></div>
						</div>
						<div className="flex gap-2">
							<Button
								onClick={() => {
									if (loggedIn) {
										logOut();
									} else {
										logIn();
									}
								}}
							>
								{loggedIn ? 'Log Out' : 'Log In'}
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
