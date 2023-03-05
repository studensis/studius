import classNames from 'classnames';
import { ChangeEventHandler } from 'react';

export const TextInput = ({
	className,
	type,
	placeholder,
	onChange,
	disabled,
	value,
	label,
}: {
	className?: string;
	type?: string;
	placeholder?: string;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	disabled?: boolean;
	value?: string | null | any;
	label?: string;
}) => {
	return (
		<>
			{label && <p className="caption text-neutral-strong">{label}</p>}
			<input
				type={type}
				placeholder={placeholder}
				disabled={disabled}
				onChange={onChange ? onChange : () => {}}
				defaultValue={value || ''}
				className={classNames(
					className,
					'py-[11px] px-4',
					disabled ? 'bg-neutral-weak' : 'bg-section',
					disabled ? 'text-neutral-medium' : 'text-neutral',
					'border focus:border-accent border-neutral-medium',
					'duration-300 focus:duration-100 hover:duration-100',
					'rounded-lg w-full focus:shadow-sm-bottom outline-none duration-100 body3 !font-[400]'
				)}
			></input>
		</>
	);
};
