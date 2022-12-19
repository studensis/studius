import Header from '../components/@studius/Header/Header';
import { LoginProvider } from '../components/hooks/LoginContext';
import '../styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<LoginProvider>
					<div
						className={'bg-light-background min-h-screen w-screen'}
					>
						<Header />
						{children}
					</div>
				</LoginProvider>
			</body>
		</html>
	);
}
