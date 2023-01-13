import { FC, useState } from 'react';
import { Button } from '../../../components/@studius/Button/Button';
import { Block } from '../../../components/@studius/PageElements/Block';
import { Stack } from '../../../components/@studius/PageElements/Stack';
import { Table } from '../../../components/@studius/Table/Table';
import { trpc } from '../../../components/hooks/TrpcProvider';

type form = {
	subjectId: string;
	subjectTitle: string;
	menteeId: string;
	menteeName: string;
	title: string;
	timeStart: string;
	timeEnd: string;
	roomId: string;
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
	const rooms = trpc.room.listRooms.useQuery();

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
		menteeName: '',
		subjectTitle: '',
		roomId: '',
		timeEnd: '',
		timeStart: '',
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
		seminarList.refetch();
	}

	async function confirmDraft(id: string) {
		setStatusMessageConfirmation('Loading');
		try {
			approveSeminar.mutate({
				roomId: '73771d60-4f7d-4dcb-99bb-4f07b55698f4',
				seminarId: id,
				dateStart: form.timeStart,
				dateEnd: form.timeEnd,
			});
			setStatusMessageConfirmation('Seminar confirmed');
			await delay(1500);
			setStatusMessageConfirmation('');
		} catch (error) {
			setStatusMessageConfirmation('Error');
		}
		seminarList.refetch();
	}

	return (
		<div>
			<div className="my-4">
				<label className="title1 m-5" htmlFor="title">
					Title
				</label>
				<input
					className="m-5 outline-none rounded-2xl border-accent-medium border-[3px] p-4 w-full "
					type="text"
					name="title"
					placeholder="Input seminar title here"
					onChange={(e) => {
						setForm({ ...form, title: e.target.value });
					}}
				/>
			</div>
			<div className="">
				<h1 className="title1 m-4">Choose Subject and Mentee:</h1>
				<Stack cols={2}>
					{enrolledSubjects.data && (
						<Block>
							<Table
								objects={
									enrolledSubjects.data
										.filter((subject) => subject.roleTitle === 'OWNER')
										.map((subject) => ({
											subject: subject.subject.title,
											roleTitle: subject.roleTitle,
											id: subject.subject.id,
											title: subject.subject.title,
										})) || []
								}
								titles={{ subject: 'Title' }}
								actionRow={(subject) => {
									return (
										<>
											<Button
												outline={form.subjectId === subject.id}
												onClick={() => {
													setForm({
														...form,
														subjectId: subject.id,
														subjectTitle: subject.title,
													});
												}}
											>
												Select
											</Button>
										</>
									);
								}}
							/>
						</Block>
					)}
					{menteeList.data && (
						<Block>
							<Table
								objects={
									menteeList.data.map((mentee) => ({
										id: mentee.id,
										firstName: mentee.firstname,
										lastName: mentee.lastname,
									})) || []
								}
								titles={{ firstName: 'Name', lastName: 'Surname' }}
								actionRow={(mentee) => {
									return (
										<>
											<Button
												outline={form.menteeId === mentee.id}
												onClick={() => {
													setForm({
														...form,
														menteeId: mentee.id,
														menteeName:
															mentee.firstName + ' ' + mentee.lastName,
													});
												}}
											>
												Select
											</Button>
										</>
									);
								}}
							/>
						</Block>
					)}
				</Stack>
			</div>
			<div className="m-4 flex justify-between text-accent-medium">
				<div></div>
				<Button
					onClick={() => {
						suggestSeminar(form);
					}}
					className=""
					loading={seminar.isLoading}
				>
					Suggest Seminar
				</Button>
			</div>
			<div>
				<Block>
					<Block className="rounded-xl border-accent-medium border-2 mb-4 ">
						<h1 className="title1 mb-5">List of Drafts</h1>
						<Table
							objects={
								seminarList.data?.filter(
									(seminar) => seminar.status === 'DRAFT'
								) || []
							}
							titles={{
								title: 'Title',
								id: 'User ID:',
								description: 'Description',
							}}
							actionRow={(seminar) => {
								return <></>;
							}}
						/>
					</Block>
					<Block className="rounded-xl border-accent-medium border-2 mb-4 ">
						<h1 className="title1 mb-5">List of sent Suggestions</h1>
						<Table
							objects={
								seminarList.data?.filter(
									(seminar) => seminar.status === 'READY'
								) || []
							}
							titles={{
								title: 'Title',
								id: 'User ID:',
								description: 'Description',
							}}
							actionRow={(seminar) => {
								return (
									<>
										<div className="grid grid-cols-1">
											<label htmlFor="room">Room:</label>
											<select
												name="room"
												onChange={(e) => {
													setForm({ ...form, roomId: e.target.value });
												}}
												className="rounded-xl p-2 px-4 border-accent-medium border-2"
											>
												{rooms.data?.map((room) => {
													return (
														<>
															<option value={room.id}>{room.title}</option>
														</>
													);
												})}
											</select>
										</div>
										<div className="grid grid-cols-1">
											<label htmlFor="TimeStart">Start Time:</label>
											<input
												onChange={(e) => {
													setForm({ ...form, timeStart: e.target.value });
												}}
												name="TimeStart"
												className="rounded-xl p-2 px-4 border-accent-medium border-2"
												type="datetime-local"
											/>
										</div>
										<div className="grid grid-cols-1">
											<label htmlFor="TimeEnd">End Time:</label>
											<input
												onChange={(e) => {
													setForm({ ...form, timeEnd: e.target.value });
												}}
												name="TimeEnd"
												className="rounded-xl p-2 px-4 border-accent-medium border-2"
												type="datetime-local"
											/>
										</div>

										<Button
											onClick={() => {
												confirmDraft(seminar.id);
											}}
											loading={approveSeminar.isLoading}
										>
											Confirm Draft
										</Button>
									</>
								);
							}}
						/>
					</Block>

					<Block className="rounded-xl border-accent-medium border-2 mb-4 ">
						<h1 className="title1 mb-5">List of confirmed Seminars</h1>
						<Table
							objects={
								seminarList.data?.filter(
									(seminar) => seminar.status === 'CONFIRMED'
								) || []
							}
							titles={{
								title: 'Title',
								id: 'User ID:',
								description: 'Description',
							}}
							actionRow={(seminar) => {
								return (
									<>
										<h1 className="title1 text-accent-medium"></h1>
									</>
								);
							}}
						/>
					</Block>
				</Block>

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
