import { useRouter } from 'next/navigation';
import useDialog from '../@studius/Modal/DialogProvider';
import ListItems from '../@studius/Modal/ListItems/ListItems';
import useLogin from '../hooks/LoginContext';
import useTheme from '../hooks/ThemeProvider';

export default function MainSidebar() {
	const { loggedIn, logout, user } = useLogin();
	const router = useRouter();
	const { setSidebar } = useDialog();
	const { theme, setDark, setLight } = useTheme();

	return (
		<>
			{loggedIn && (
				<>
					{user && <ListItems.Profile userId={user.userId} />}
					<div className="block md:hidden">
						<ListItems.Action
							onClick={() => {
								router.push('/intranet');
							}}
							icon="home"
							text="Homepage"
						/>
						<ListItems.Action
							onClick={() => {
								router.push('/calendar');
							}}
							icon="calendar"
							text="Assignments"
						/>

						{user && (user.role === 'ADMIN' || user.role === 'SUPERADMIN') && (
							<ListItems.Action
								onClick={() => {
									router.push('/admin');
								}}
								icon="adminTools"
								text="Workspace Tools"
							/>
						)}
					</div>
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
							router.push('/login');
						}}
					/>
				</>
			)}
		</>
	);
}
