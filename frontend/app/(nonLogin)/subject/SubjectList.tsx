import { Stack } from '../../../components/@studius/PageElements/Stack';
import SubjectCard from '../../../components/Cards/SubjectCard';
import { trpc } from '../../../components/hooks/TrpcProvider';

export default function SubjectList() {
	const subjects = trpc.subject.listSubjects.useQuery();

	return (
		<Stack cols={3} mobileCols={1}>
			{subjects.data &&
				subjects.data.map((subject) => <SubjectCard subject={subject} />)}
		</Stack>
	);
}
