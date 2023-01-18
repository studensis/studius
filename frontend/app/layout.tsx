'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
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
						<GoogleOAuthProvider
							clientId={
								'1040571623043-990cbggsohncdbc6trbtgnppenpb7274.apps.googleusercontent.com'
							}
						>
							<ThemeProvider>
								<DialogProvider>
									<div
										className={
											'relative min-h-screen w-screen overflow-x-hidden'
										}
									>
										{children}
										<TailwindCache />
										<DialogOverlay />
										<Dialog />
									</div>
								</DialogProvider>
							</ThemeProvider>
						</GoogleOAuthProvider>
					</LoginProvider>
				</TrpcProvider>
			</body>
		</html>
	);
}
