import { FC, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';

type form = {
	subjectId: string;
	menteeId: string;
	title: string;
};

const Seminar2: FC<{ userId: string }> = ({ userId }) => {
	//Querys
	const user = trpc.user.getUserById.useQuery(userId);
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(userId);
	const menteeList = trpc.user.listMentees.useQuery(userId);
	const approveSeminar = trpc.seminar.approveSeminar.useMutation();
	const seminarList = trpc.seminar.listUserSeminars.useQuery({
		id: userId,
		options: { isMentor: true, isStudent: false },
	});

	//Mutations
	const seminar = trpc.seminar.createSeminar.useMutation();

	//useState sekcija
	const [statusMessage, setStatusMessage] = useState('');
	const [statusMessageConfirmation, setStatusMessageConfirmation] =
		useState('');
	const [date, setDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [form, setForm] = useState<form>({
		subjectId: '',
		menteeId: '',
		title: '',
	});

	//Delay za status message
	function delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	//Submit seminara
	async function suggestSeminar(form: form) {
		setStatusMessage('Loading');
		try {
			seminar.mutate({
				title: form.title,
				mentorId: user.data?.id,
				subjectId: form.subjectId,
				userId: form.menteeId,
			});
			setStatusMessage('Seminar submitted');
			await delay(1500);
			setStatusMessage('');
		} catch (error) {
			//setStatusMessage(error);
			setStatusMessage('Error');
		}
	}

	async function confirmDraft(id: string) {
		setStatusMessageConfirmation('Loading');
		try {
			approveSeminar.mutate({
				roomId: '73771d60-4f7d-4dcb-99bb-4f07b55698f4',
				seminarId: id,
				dateStart: date + 'T' + startTime + ':00',
				dateEnd: date + 'T' + endTime + ':00',
			});
			setStatusMessageConfirmation('Seminar confirmed');
			await delay(1500);
			setStatusMessageConfirmation('');
		} catch (error) {
			setStatusMessageConfirmation('Error');
		}
	}

	return (
		<div>
			<div>
				<h1 className="title1">List of sent Suggestions</h1>
				<Stack cols={1}>
					{seminarList.data &&
						seminarList.data
							.filter((seminar) => seminar.status === 'DRAFT')
							.map((seminar) => (
								<div
									key={seminar.id}
									className="flex w-full rounded-md shadow-md p-5 m-2 mt-5 gap-5 border-accent-medium border-[2px] "
								>
									<div className="w-[25%] border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.title}
									</div>
									<div className="text-sm border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.userId}
									</div>
									<div className="">{seminar.description}</div>
								</div>
							))}
				</Stack>
				<br />
				<h1 className="title1 mb-2">List of Drafts</h1>
				<Stack cols={1}>
					{seminarList.data &&
						seminarList.data
							.filter((seminar) => seminar.status === 'READY')
							.map((seminar) => (
								<div
									key={seminar.id}
									className="flex w-full rounded-md shadow-md p-5 m-2 mt-5 gap-5 border-accent-medium border-[2px] "
								>
									<div className="w-[25%] border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.title}
									</div>
									<div className="text-sm border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.userId}
									</div>
									<div className="">{seminar.description}</div>
									<Button
										onClick={() => {
											confirmDraft(seminar.id);
										}}
									>
										Confirm Draft
									</Button>
									<input
										type="date"
										onChange={(e) => {
											setDate(e.target.value);
										}}
									/>
									<input
										type="time"
										onChange={(e) => {
											setStartTime(e.target.value);
										}}
									/>
									<input
										type="time"
										onChange={(e) => {
											setEndTime(e.target.value);
										}}
									/>
								</div>
							))}
				</Stack>
				<h1 className="title1">List of confirmed Seminars</h1>
				<Stack cols={1}>
					{seminarList.data &&
						seminarList.data
							.filter((seminar) => seminar.status === 'CONFIRMED')
							.map((seminar) => (
								<div
									key={seminar.id}
									className="flex w-full rounded-md shadow-md p-5 m-2 mt-5 gap-5 border-accent-medium border-[2px] "
								>
									<div className="w-[25%] border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.title}
									</div>
									<div className="text-sm border-r-2 border-accent-medium p-2 px-4 ">
										{seminar.userId}
									</div>
									<div className="">{seminar.description}</div>
								</div>
							))}
				</Stack>
				<div className="mt-10">
					<h1
						className={
							statusMessageConfirmation != ''
								? 'absolute bottom-5 left-10 title px-5 py-2 rounded-xl border-[2px] border-success text-success'
								: ''
						}
					>
						{statusMessageConfirmation}
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Seminar2;
