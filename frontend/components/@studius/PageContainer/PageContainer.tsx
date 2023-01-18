import React from 'react';

export default function PageContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="mt-20 block w-full max-w-[1170px] mx-auto overflow-y-hidden pb-20">
				{children}
			</div>
		</>
	);
}
