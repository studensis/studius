import { FC } from 'react';

export const Section: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="md:px-20 md:py-40 px-6 py-20 rounded-2xl bg-section w-full">
			{children}
		</div>
	);
};
