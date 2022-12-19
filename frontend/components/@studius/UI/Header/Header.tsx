'use client';

import Link from 'next/link';
import useLogin from '../../../hooks/LoginContext';
import { Button } from '../../../old/Button';

function Header(props) {
	let { loggedIn, logIn, logOut } = useLogin();
	return (
		<>
			{loggedIn ? (
				<>
					<div className="w-full bg-light-accent-weak px-4 py-2 flex place-content-between place-items-center">
						<div className="flex">
							<Link href="/">Studius</Link>
						</div>
						<div className="flex">
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
