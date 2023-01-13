import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { trpc } from '../../../components/hooks/TrpcProvider';

type form = {
	subjectId: string;
	menteeId: string;
	title: string;
};

const Seminar: FC<{ userId: string }> = ({ userId }) => {
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

	useEffect(() => {}, []);

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
			<div className="fixed top-20 left-10 rounded-md p-2 border-2 opacity-40 w-[8%]">
				<p className="text-sm">
					<span className="text-accent-strong">Title:</span> {form.title}
				</p>
				<p className="text-sm">
					<span className="text-accent-strong">Subject:</span> {form.subjectId}
				</p>
				<p className="text-sm">
					<span className="text-accent-strong">Mentee:</span> {form.menteeId}
				</p>
			</div>
			<div className="p-8 outline-none border-accent-medium border-[2px] rounded-xl">
				<h1 className="title1 m-4">
					Choose a subject for a Seminar suggestion
				</h1>
				<Stack cols={3}>
					{enrolledSubjects.data &&
						enrolledSubjects.data
							.filter((es) => es.roleTitle === 'OWNER')
							.map((enrolledSubject) => (
								<div className=" flex " key={enrolledSubject.subject.id}>
									<Link href={'/subject/' + enrolledSubject.subject.id} key={3}>
										<Block>
											<p className="text-neutral-strong caption">{}</p>
											<p className="title2">{enrolledSubject.subject.title}</p>
										</Block>
									</Link>
									<Button
										onClick={() => {
											setForm({
												...form,
												subjectId: enrolledSubject.subject.id,
											});
										}}
									>
										Select
									</Button>
								</div>
							))}
				</Stack>
			</div>
			<br />
			<div className="p-8 outline-none border-accent-medium border-[2px] rounded-xl">
				<h1 className="title1 m-4">Choose your mentee for this Seminar </h1>
				<Stack cols={3}>
					{menteeList.data &&
						menteeList.data.map((mentee) => (
							<div className=" flex " key={mentee.id}>
								<Link href={'/subject/' + mentee.id} key={3}>
									<Block>
										<p className="text-neutral-strong caption">{}</p>
										<p className="title2">
											{mentee.firstname + ' ' + mentee.lastname}
										</p>
									</Block>
								</Link>
								<Button
									onClick={() => {
										setForm({
											...form,
											menteeId: mentee.id,
										});
									}}
								>
									Select
								</Button>
							</div>
						))}
				</Stack>
			</div>
			<br />
			<Block className="p-8 outline-none border-accent-medium border-[2px] rounded-xl">
				<h1 className="title1 m-4">Fill this Seminar Form</h1>
				<form className="p-5 ">
					<div className="flex items-center">
						<label className="title1 m-5" htmlFor="title">
							Title
						</label>
						<input
							className="m-5 outline-none rounded-2xl border-accent-strong border-[3px] p-4 w-full "
							type="text"
							name="title"
							placeholder="Input seminar title here"
							onChange={(e) => {
								setForm({ ...form, title: e.target.value });
							}}
						/>
					</div>
				</form>
			</Block>
			<div className="w-full flex justify-between mt-4 px-10">
				<h1
					className={
						statusMessage != ''
							? 'title px-5 py-2 rounded-xl border-[2px] border-success text-success'
							: ''
					}
				>
					{statusMessage}
				</h1>
				<Button
					onClick={() => {
						suggestSeminar(form);
					}}
					className=""
				>
					Suggest Seminar
				</Button>
			</div>
			<br />
			<br />

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

export default Seminar;