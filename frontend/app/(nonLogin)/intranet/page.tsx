'use client';

import { Block } from '../../../components/@studius/PageElements/Block';
import useLogin from '../../../components/hooks/LoginContext';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export default function Intranet() {
	const { loggedIn } = useLogin();
	return (
		<>
			<div className="flex gap-6">
				{loggedIn && (
					<>
						<div className="hidden md:block w-[400px]">
							<LeftPanel />
						</div>

						<div className="flex-1 flex flex-col gap-10 w-full">
							<RightPanel />
						</div>
					</>
				)}
				{!loggedIn && (
					<Block>
						<span className="text-danger"> Please log in.</span>{' '}
					</Block>
				)}
			</div>
		</>
	);
}
