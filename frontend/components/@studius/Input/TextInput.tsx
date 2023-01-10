import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

export const TextInput = ({
	className,
	type,
	placeholder,
	onChange,
	disabled,
}: {
	className?: string;
	type?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	disabled?: boolean;
}) => {
	return (
		<>
			<input
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange ? onChange : () => {}}
				className={classNames(
					className,
					'p-4',
					'rounded-xl',
					'bg-neutral-weak',
					'text-neutral'
				)}
			></input>
		</>
	);
};
