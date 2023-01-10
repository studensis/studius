import {
	Dialog,
	DialogOverlay,
	DialogProvider,
} from '../components/@studius/Modal/DialogProvider';
import { LoginProvider } from '../components/hooks/LoginContext';
import { ThemeProvider } from '../components/hooks/ThemeProvider';
import TrpcProvider from '../components/hooks/TrpcProvider';
import { TailwindCache } from '../components/TailwindCache';
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
							<DialogProvider>
								<div
									className={'relative min-h-screen w-screen overflow-x-hidden'}
								>
									{children}
									<TailwindCache />
									<DialogOverlay />
									<Dialog />
								</div>
							</DialogProvider>
						</ThemeProvider>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
