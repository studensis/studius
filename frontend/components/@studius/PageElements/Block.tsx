import classNames from 'classnames';
import { FC } from 'react';

export const Block: FC<{
	children: React.ReactNode;
	className?: string;
	danger?: boolean;
	info?: boolean;
	success?: boolean;
	warning?: boolean;
}> = ({ children, className, danger, success, info, warning }) => {
	return (
		<div
			className={classNames(
				'md:px-10 px-6 py-10 rounded-2xl w-full h-full overflow-x-scroll md:overflow-x-auto',
				!danger && !warning && !success && !info && 'bg-section text-neutral',
				danger && 'bg-danger-weak text-danger',
				warning && 'bg-warning-weak text-warning',
				success && 'bg-success-weak text-success',
				info && 'bg-info-weak text-info',
				className
			)}
		>
			{children}
		</div>
	);
};
