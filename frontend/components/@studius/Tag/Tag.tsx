export default function Tag({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="px-2 py-1 rounded-lg bg-info-weak inline-block">
				<p className="text-info caption">{children}</p>
			</div>
		</>
	);
}
