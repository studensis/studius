import { useRouter } from 'next/navigation';
import ListItems from '../@studius/Modal/ListItems/ListItems';
import useModal from '../@studius/Modal/ModalProvider';
import useLogin from '../hooks/LoginContext';
import useTheme from '../hooks/ThemeProvider';

export default function MainSidebar() {
	const { loggedIn, logout, user } = useLogin();
	const router = useRouter();
	const { setSidebar } = useModal();
	const { theme, setDark, setLight } = useTheme();

	return (
		<>
			{loggedIn && (
				<>
					{user && <ListItems.Profile userId={user.userId} />}
					<ListItems.Action
						text="View Profile"
						icon="user"
						onClick={() => {
							router.push('/user/' + user!.userId);
						}}
					/>
					<ListItems.Action
						text="Settings"
						icon="settings"
						onClick={() => {}}
					/>
					<ListItems.Action
						text="Toggle Dark Mode"
						icon="user"
						onClick={() => {
							if (theme === 'dark') {
								setLight();
							} else {
								setDark();
							}
						}}
					/>
					<ListItems.Action
						text="Log Out"
						icon="logOut"
						onClick={() => {
							logout();
							setSidebar(null);
						}}
					/>
				</>
			)}
		</>
	);
}
