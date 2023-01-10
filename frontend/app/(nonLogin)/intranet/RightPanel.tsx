import Link from 'next/link';
import { Block } from '../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';
import { PageStack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';
import SubjectList from './SubjectList';

const Greeting = () => {
	const { user } = useLogin();
	const name = trpc.user.getUserById.useQuery(user!.userId);
	if (name.isLoading && !name.data) {
		return <Spinner />;
	} else {
		return <>Welcome back, {name.data!.firstname}</>;
	}
};

export const RightPanel = () => {
	const { user } = useLogin();
	return (
		<>
			<PageStack>
				<h1 className="display3">
					<Greeting />!
				</h1>
				<Block>
					<h3 className="title3 mb-2">User:</h3>
					<pre className="text-neutral-strong">
						{JSON.stringify(user, null, 2)}
					</pre>
				</Block>
				<div>
					<SectionTop>
						<h2 className="title2">Subjects</h2>
						<Link href="/subject">
							<p className="text-accent button-small">View all</p>
						</Link>
					</SectionTop>
					<SubjectList />
				</div>
			</PageStack>
		</>
	);
};
