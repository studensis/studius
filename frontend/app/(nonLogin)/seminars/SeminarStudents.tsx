import { FC, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';

type form = {
	subjectId: string;
	menteeId: string;
	title: string;
};

const SeminarStudents: FC<{ userId: string }> = ({ userId }) => {
	const updateSeminar = trpc.seminar.updateSeminar.useMutation();
	const seminarList = trpc.seminar.listUserSeminars.useQuery({
		id: userId,
		options: { isMentor: false, isStudent: true },
	});

	const [content, setContent] = useState('');

	function confirmSeminarDraft(id: string, description: string) {
		updateSeminar.mutate({ id: id, status: 'READY', description });
	}

	return (
		<div>
			<h1 className="title1">List of Seminars</h1>
			<Stack cols={1}>
				{seminarList.data &&
					seminarList.data.map((seminar) => (
						<div key={seminar.id}>
							<div className="flex w-full rounded-md shadow-md p-5 m-2 mt-5 gap-5 border-accent-medium border-[2px] ">
								<div className="w-[25%] border-r-2 border-accent-medium p-2 px-4 ">
									{seminar.title}
								</div>
								<div className="text-sm border-r-2 border-accent-medium p-2 px-4 ">
									{seminar.userId}
								</div>
								<div className="">
									<input
										type="text"
										placeholder="Content"
										className="w-full rounded-xl outline-none border-accent-medium border-[2px] px-4 p-2 "
										onChange={(e) => {
											setContent(e.target.value);
										}}
									/>
								</div>
								<Button
									onClick={() => {
										confirmSeminarDraft(seminar.id, content);
									}}
								>
									Send Seminar Draft
								</Button>
							</div>
						</div>
					))}
			</Stack>
		</div>
	);
};

export default SeminarStudents;
