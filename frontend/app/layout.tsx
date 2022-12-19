import Header from '../components/@studius/UI/Header/Header';
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
					<Header />
					{children}
				</LoginProvider>
			</body>
		</html>
	);
}
