import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import Topbar from '../components/Topbar';
import UserMenu from '../components/UserMenu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
	const [menuActive, setMenuActive] = useState(false);

	return (
		<SessionProvider session={pageProps.session}>
			<Sidebar />

			<UserMenu
				active={menuActive}
				menuActive={menuActive}
				setMenuActive={setMenuActive}
			/>
			<Topbar menuActive={menuActive} setMenuActive={setMenuActive} />
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
