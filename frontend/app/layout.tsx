import { LoginProvider } from '../components/hooks/LoginContext';
import { ThemeProvider } from '../components/hooks/ThemeProvider';
import TrpcProvider from '../components/hooks/TrpcProvider';
import '../styles/colors.css';
import '../styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body>
				<TrpcProvider>
					<LoginProvider>
						<ThemeProvider>
							<div
								className={
									'bg-background dark:bg-dark-background min-h-screen w-screen overflow-x-hidden'
								}
							>
								{children}
							</div>
						</ThemeProvider>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
