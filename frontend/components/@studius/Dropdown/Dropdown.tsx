import { useState } from 'react';
import Icon from '../Icon/Icon';

function Dropdown({
	options,
	changeOption,
	option,
}: {
	options: number[];
	changeOption: Function;
	option: number;
}) {
	const [isDroppedDown, setIsDroppedDown] = useState(false);

	return (
		<div
			className={
				'bg-section w-[240px] border-[2px] border-accent-medium ' +
				(isDroppedDown ? 'rounded-t-[8px]' : 'rounded-[8px]')
			}
		>
			<div
				onClick={() => setIsDroppedDown(!isDroppedDown)}
				className="flex justify-between py-[10px] px-[16px]"
			>
				<p className="whitespace-nowrap body3">Display: {option}</p>{' '}
				<div
					className={
						'-mt-1  duration-150 ' + (isDroppedDown ? '' : 'rotate-90')
					}
				>
					<Icon icon={'dropdownArrow'} />
				</div>
			</div>
			<div className="absolute flex flex-col -ml-[2px]">
				{isDroppedDown &&
					options.map((option, i) => {
						return (
							<>
								<div
									onClick={() => {
										changeOption(option);
										setIsDroppedDown(!isDroppedDown);
									}}
									className={
										'relative min-w-[240px] bg-section duration-300 hover:bg-neutral-weak active:bg-accent-weak border-accent-medium text-neutral-strong px-[16px] py-[8px] ' +
										(i === 0 ? 'border-t-[2px] ' : '') +
										(i + 1 === options.length
											? 'border-b-[2px] border-x-[2px] rounded-b-[8px] '
											: 'border-x-[2px] ')
									}
								>
									{option}
								</div>
							</>
						);
					})}
			</div>
		</div>
	);
}

export default Dropdown;
