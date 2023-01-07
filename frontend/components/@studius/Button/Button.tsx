import { FC, ReactNode } from 'react';
import Icon, { IconName } from '../Icon/Icon';

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
						className={
							small == true
								? 'button-small justify-center flex items-center gap-1 text-special-white'
								: 'button-large justify-center flex items-center gap-1 text-special-white'
						}
					>
						{leftIcon && (
							<Icon
								icon={leftIcon}
								size={small == true ? 12 : 16}
								className={'bg-special-white'}
								// color={darkMode ? "white" : accent-strong}
							/>
						)}
						{children}
						{rightIcon && (
							<Icon
								icon={rightIcon}
								size={small == true ? 12 : 16}
								className={'bg-special-white'}
								// color={darkMode ? "white" : accent-strong}
							/>
						)}
					</h1>
				</div>
			</div>
		</button>
	);
};

export { Button };
