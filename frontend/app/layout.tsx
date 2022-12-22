import PageContainer from '../components/@studius/Container/Container';
import Header from '../components/@studius/Header/Header';
import { LoginProvider } from '../components/hooks/LoginContext';
import TrpcProvider from '../components/hooks/TrpcProvider';
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
						<div
							className={
								'bg-light-background min-h-screen w-screen'
							}
						>
							<Header />
							<PageContainer>{children}</PageContainer>
						</div>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
