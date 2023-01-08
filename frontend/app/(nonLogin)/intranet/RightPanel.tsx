import Link from 'next/link';
import { Block } from '../../../components/@studius/PageElements/Block';
import { SectionTop } from '../../../components/@studius/PageElements/SectionTop';
import { PageStack } from '../../../components/@studius/PageElements/Stack';
import useLogin from '../../../components/hooks/LoginContext';
import { trpc } from '../../../components/hooks/TrpcProvider';
import SubjectList from './SubjectList';

const Greeting = () => {
	const { user } = useLogin();
	const name = trpc.user.getUserById.useQuery(user!.userId);
	return <>Welcome back, {name.data?.firstname}</>;
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
					<span className="title1">Me:</span>
					<pre>{JSON.stringify(user)}</pre>
				</Block>
				<div>
					<SectionTop>
						<h2 className="title1">Subjects</h2>
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
