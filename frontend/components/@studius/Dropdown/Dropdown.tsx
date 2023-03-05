import { useRef } from 'react';
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
	const parentRef = useRef<HTMLDivElement>(null);
	return (
		<div
			ref={parentRef}
			className={
				'bg-section w-[240px] border group border-neutral-medium focus:border-accent-medium ' +
				'focus:rounded-b-[0px] rounded-[8px]'
			}
			tabIndex={0}
		>
			<div className="flex justify-between py-[10px] px-[16px]">
				<p className="whitespace-nowrap body3">Display: {option}</p>{' '}
				<div className={'-mt-1 rotate-0 duration-150 group-focus:rotate-180'}>
					<Icon icon={'dropdownArrow'} />
				</div>
			</div>
			<div className="absolute flex-col -ml-[1px] group-focus:shadow-sm-bottom group-focus:flex hidden">
				{options.map((option, i) => {
					return (
						<>
							<div
								onClick={() => {
									changeOption(option);
									parentRef.current?.blur();
								}}
								className={
									'relative min-w-[240px] bg-section duration-300 hover:bg-neutral-weak active:bg-accent-weak border-accent-medium text-neutral-strong px-[16px] py-[8px] ' +
									(i === 0 ? 'border-t ' : '') +
									(i + 1 === options.length
										? 'border-b border-x rounded-b-[8px] '
										: 'border-x ')
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
