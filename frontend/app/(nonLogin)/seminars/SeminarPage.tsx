import { FC, useState } from 'react';
import { trpc } from '../../../components/hooks/TrpcProvider';
import Seminar from './Seminar';
import SeminarStudents from './SeminarStudents';

const SeminarPage: FC<{ userId: string }> = ({ userId }) => {
	const subjects = trpc.user.getEnrolledSubjects.useQuery({
		userId: userId,
		active: true,
	});

	const [isOwnerOnAnySubject, setIsOwnerOnAnySubject] = useState(false);

	async function set() {
		await subjects.data?.map((subject) => {
			if (subject.roleTitle == 'OWNER') setIsOwnerOnAnySubject(true);
		});
	}

	return (
		<div>
			{isOwnerOnAnySubject ? (
				<Seminar userId={userId} />
			) : (
				<SeminarStudents userId={userId} />
			)}
		</div>
	);
};

export default SeminarPage;
