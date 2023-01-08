import { FC } from 'react';

export const Block: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="md:px-10 px-6 py-10 rounded-2xl bg-section w-full">
			{children}
		</div>
	);
};
