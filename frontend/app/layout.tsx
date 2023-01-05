import {
	ModalOverlay,
	ModalProvider,
	ModalSidebar,
} from '../components/@studius/Modal/ModalProvider';
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
			<body className="overflow-x-hidden bg-background">
				<TrpcProvider>
					<LoginProvider>
						<ThemeProvider>
							<ModalProvider>
								<div
									className={
										'relative min-h-screen w-screen overflow-x-hidden'
									}
								>
									{children}
									<ModalOverlay />
									<ModalSidebar />
								</div>
							</ModalProvider>
						</ThemeProvider>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
