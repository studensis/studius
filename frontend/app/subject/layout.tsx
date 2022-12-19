export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<h1 className="display2">Subjects</h1>
			{children}
		</div>
	);
}
