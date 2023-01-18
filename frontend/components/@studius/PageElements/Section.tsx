import classNames from 'classnames';
import { FC } from 'react';

export const Section: FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className,
}) => {
	return (
		<div
			className={classNames(
				'md:px-20 md:py-20 px-6 py-20 rounded-2xl bg-section w-full',
				className
			)}
		>
			{children}
		</div>
	);
};
