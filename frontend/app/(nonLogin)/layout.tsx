import Header from '../../components/@studius/Header/Header';
import PageContainer from '../../components/@studius/PageContainer/PageContainer';
import '../../styles/colors.css';
import '../../styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<Header />
			<PageContainer>{children}</PageContainer>
		</section>
	);
}
