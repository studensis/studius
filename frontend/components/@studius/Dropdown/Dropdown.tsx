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
				'bg-section max-w-[240px] border-[1px] border-accent-medium ' +
				(isDroppedDown ? 'rounded-t-[8px]' : 'rounded-[8px]')
			}
		>
			<div
				onClick={() => setIsDroppedDown(!isDroppedDown)}
				className="flex justify-between p-1"
			>
				<p className="whitespace-nowrap body3">Display: {option}</p>{' '}
				<Icon icon={'dropdownArrow'} />
			</div>
			<div className="relative">
				<div className="absolute flex flex-col">
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
											'relative text-neutral min-w-[240px] border-t-[1px] border-x-[1px] bg-section border-accent-medium' +
											(i + 1 === options.length
												? 'border-[1px] border-accent-medium'
												: '')
										}
									>
										{option}
									</div>
								</>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default Dropdown;
