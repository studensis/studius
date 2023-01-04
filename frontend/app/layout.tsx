import Header from '../components/@studius/Header/Header';
import PageContainer from '../components/@studius/PageContainer/PageContainer';
import { LoginProvider } from '../components/hooks/LoginContext';
import { ThemeProvider } from '../components/hooks/ThemeProvider';
import TrpcProvider from '../components/hooks/TrpcProvider';
import '../styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className="">
				<TrpcProvider>
					<LoginProvider>
						<ThemeProvider>
							<div
								className={
									'bg-background dark:bg-dark-background min-h-screen w-screen overflow-x-hidden'
								}
							>
								<Header />
								<PageContainer>{children}</PageContainer>
							</div>
						</ThemeProvider>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
