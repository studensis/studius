'use client';

import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';
import SubjectList from './SubjectList';

const Name = () => {
	const { user } = useLogin();
	const name = trpc.user.getUserById.useQuery(user!.userId);
	return <>{name.data?.firstname}</>;
};

export default function Intranet() {
	const { user, loggedIn } = useLogin();
	return (
		<>
			<div className="flex gap-6">
				<div className="hidden md:flex flex-col gap-2 w-[400px]">
					<div className="px-6 flex place-content-between">
						<h2 className="title2">Events</h2>
						<h2 className="button-small text-accent">
							View all events
						</h2>
					</div>
					<div className="bg-section rounded-2xl p-6 title3">May</div>
				</div>

				<div className="flex-1 flex flex-col gap-10">
					{loggedIn && (
						<>
							<h1 className="display3">
								Welcome back, <Name />!
							</h1>
							<div className="p-10 bg-section rounded-2xl">
								<span className="title1">Me:</span>
								<pre>{JSON.stringify(user)}</pre>
							</div>
							<div>
								<div className="px-6 flex place-content-between mb-2">
									<h2 className="title1">Subjects</h2>
								</div>
								<SubjectList />
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
