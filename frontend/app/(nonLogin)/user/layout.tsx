export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			{/* <h1 className="title3">Users</h1> */}
			{children}
		</div>
	);
}
