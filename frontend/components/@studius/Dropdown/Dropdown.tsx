import { useState } from 'react';

function Dropdown({ options }: { options: string[] }) {
	const [isDroppedDown, setIsDroppedDown] = useState(false);

	return (
		<>
			<div onClick={() => setIsDroppedDown(!isDroppedDown)}>
				<div>Nekaj</div>
				{options.map((option) => {
					return (
						<>
							<div>{isDroppedDown && <p>{option}</p>}</div>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Dropdown;
