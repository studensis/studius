'use client';

import useLogin from '../../../components/hooks/LoginContext';
import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

export default function Intranet() {
	const { loggedIn } = useLogin();
	return (
		<>
			<div className="flex gap-6">
				<div className="hidden md:block w-[400px]">
					{loggedIn && <LeftPanel />}
				</div>

				<div className="flex-1 flex flex-col gap-10 w-full">
					{loggedIn && <RightPanel />}
				</div>
			</div>
		</>
	);
}
