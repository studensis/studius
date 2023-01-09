import Link from 'next/link';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const subjects = trpc.subject.listSubjects.useQuery();

	return (
		<Stack cols={3} mobileCols={1}>
			{subjects.isLoading && <Spinner />}
			{subjects.data &&
				subjects.data.map((subject) => (
					<Link href={'/subject/' + subject.id} key={subject.id}>
						<div className="p-10 bg-section rounded-3xl h-full">
							<p className="title1">{subject.title}</p>
							<p className="body1 text-neutral-strong">
								{subject.description.substring(0, 80) + '...'}
							</p>
						</div>
					</Link>
				))}
		</Stack>
	);
}
