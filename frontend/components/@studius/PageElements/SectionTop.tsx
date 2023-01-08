import { FC } from 'react';

export const SectionTop: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="w-full flex justify-between gap-2 px-6 md:px-10 mb-2">
			{children}
		</div>
	);
};
