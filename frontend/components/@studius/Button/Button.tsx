import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import Icon, { IconName } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';

type ButtonType = 'primary' | 'secondary';

type ButtonProps = {
	children?: ReactNode | ReactNode[];
	small?: boolean;
	type?: ButtonType;
	outline?: boolean;
	active?: boolean;
	disabled?: boolean;
	leftIcon?: IconName;
	rightIcon?: IconName;
	style?: any;
	onClick?: any;
	formType?: any;
	className?: string;
	loading?: boolean;
};

const Button: FC<ButtonProps> = ({
	leftIcon,
	rightIcon,
	disabled,
	outline,
	small,
	children,
	style,
	onClick,
	formType,
	className,
	loading,
}) => {
	return (
		<button
			onClick={(e) => {
				onClick && onClick();
			}}
			type={formType ? formType : 'button'}
		>
			<div className="select-none">
				<div
					style={style ?? style}
					// @TODO
					// className={classNames()}
					className={(children
						? outline == true
							? disabled == true
								? 'flex justify-center items-center py-2 px-4 bg-section text-accent-strong w-max h-[40px] rounded-2xl opacity-40 border-2'
								: 'flex justify-center items-center py-2 px-4 bg-section text-accent-strong border-2 w-max h-[40px] rounded-2xl hover:opacity-80 hover:bg-accent-weak hover:border-accent-strong active:opacity-50 active:bg-accent-strong active:text-section '
							: disabled == true
							? 'flex justify-center items-center py-2 px-4 bg-accent-strong text-section w-max h-[40px] rounded-2xl opacity-20'
							: 'flex justify-center items-center py-2 px-4 bg-accent-strong text-section w-max h-[40px] rounded-2xl hover:opacity-80 active:opacity-50'
						: outline == true
						? disabled == true
							? 'flex justify-center items-center py-2 px-4 bg-section text-accent-strong w-[40px] h-[40px] rounded-2xl opacity-40 border-2'
							: 'flex justify-center items-center py-2 px-4 bg-section text-accent-strong border-2 [40px] h-[40px] rounded-2xl hover:opacity-80 hover:bg-accent-weak hover:border-accent-strong active:opacity-50 active:bg-accent-strong active:text-section '
						: disabled == true
						? 'flex justify-center items-center py-2 px-4 bg-accent-strong text-section w-[40px] h-[40px] rounded-2xl opacity-20'
						: 'flex justify-center items-center py-2 px-4 bg-accent-strong text-section w-[40px] h-[40px] rounded-2xl hover:opacity-80 active:opacity-50'
					)
						.concat(' ')
						.concat(className ? className : '')}
				>
					<h1
						className={classNames(
							'justify-center flex items-center gap-1 text-special-white',
							small ? 'button-small' : 'button-large'
						)}
					>
						{leftIcon &&
							(loading ? (
								<Spinner />
							) : (
								<Icon
									icon={leftIcon}
									size={small == true ? 12 : 16}
									className={
										outline
											? disabled
												? 'bg-accent-medium'
												: 'bg-accent'
											: 'bg-special-white'
									}
									// color={darkMode ? "white" : accent-strong}
								/>
							))}
						{!leftIcon && !rightIcon ? (
							<>{loading ? <Spinner /> : children}</>
						) : (
							children
						)}
						{rightIcon &&
							(loading ? (
								<Spinner />
							) : (
								<Icon
									icon={rightIcon}
									size={small == true ? 12 : 16}
									className={
										outline
											? disabled
												? 'bg-accent-medium'
												: 'bg-accent'
											: 'bg-special-white'
									}
									// color={darkMode ? "white" : accent-strong}
								/>
							))}
					</h1>
				</div>
			</div>
		</button>
	);
};

export { Button };
