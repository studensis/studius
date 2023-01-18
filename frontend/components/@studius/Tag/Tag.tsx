export default function Tag({ text }: { text: string }) {
	return (
		<>
			<div className="px-2 py-1 rounded-lg bg-info-weak inline-block">
				<p className="text-info caption">
					{text == 'ADMIN'
						? 'Studentska Služba'
						: text == 'SUPERADMIN'
						? 'Centar Informacijske Potpore'
						: text}
				</p>
			</div>
		</>
	);
}
