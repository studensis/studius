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
		menteeName: '',
		subjectTitle: '',
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
				<Button
					onClick={() => {
						suggestSeminar(form);
					}}
					className=""
				>
					Suggest Seminar
				</Button>
			</div>
			<div>
				<Block>
					<Block className="rounded-xl border-accent-medium border-2 mb-4 ">
						<h1 className="title1 my-5">List of Drafts</h1>
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
										<Button
											onClick={() => {
												confirmDraft(seminar.id);
											}}
										>
											Confirm Draft
										</Button>
									</>
								);
							}}
						/>
					</Block>

					<Block className="rounded-xl border-accent-medium border-2 mb-4 ">
						<h1 className="title1 my-5">List of confirmed Seminars</h1>
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
