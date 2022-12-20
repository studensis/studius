import React from 'react';

export default function PageContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="block w-full max-w-[1170px] mx-auto">
				{children}
			</div>
		</>
	);
}
