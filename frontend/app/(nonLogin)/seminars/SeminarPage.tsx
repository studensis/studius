import { FC, useEffect, useState } from 'react';
import { trpc } from '../../../components/hooks/TrpcProvider';
import Seminar2 from './Seminar2';
import SeminarStudents from './SeminarStudents';

const SeminarPage: FC<{ userId: string }> = ({ userId }) => {
	const subjects = trpc.user.getEnrolledSubjects.useQuery(userId);

	const [isOwnerOnAnySubject, setIsOwnerOnAnySubject] = useState(false);

	useEffect(() => {
		set();
	}, []);

	//Trenutno rjesenje: provjerava je li user na bilo kojem predmetu owner
	//(po tome se Brcicu prikazuje strana Mentora, a Marku strana Menteeja)
	async function set() {
		await subjects.data?.map((subject) => {
			if (subject.roleTitle == 'OWNER') setIsOwnerOnAnySubject(true);
		});
	}

	return (
		<div>
			{isOwnerOnAnySubject ? (
				<Seminar2 userId={userId} />
			) : (
				<SeminarStudents userId={userId} />
			)}
		</div>
	);
};

export default SeminarPage;
