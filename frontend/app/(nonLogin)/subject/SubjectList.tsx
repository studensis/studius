import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Spinner } from '../../../components/@studius/Spinner/Spinner';
import SubjectCard from '../../../components/Cards/SubjectCard';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const subjects = trpc.subject.listSubjects.useQuery();

	return (
		<div className="">
			<Stack cols={3} mobileCols={1}>
				{subjects.isLoading && <Spinner />}
				{subjects.data &&
					subjects.data.map((subject) => <SubjectCard subject={subject} />)}
			</Stack>
		</div>
	);
}
