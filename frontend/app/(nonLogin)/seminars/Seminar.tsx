import Link from 'next/link';
import { FC, useState } from 'react';
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
	const user = trpc.user.getUserById.useQuery(userId);
	const enrolledSubjects = trpc.user.getEnrolledSubjects.useQuery(userId);

	const [form, setForm] = useState<form>({
		subjectId: '',
		menteeId: '',
		title: '',
	});

	function selectSubject(id: string) {
		setForm({ ...form, subjectId: id });
	}

	return (
		<div>
			{
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
			}
			<br />
			<br />
			<Block>
				<form className="p-5 flex items-center">
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
				</form>
				<Button />
			</Block>
			<h1>{JSON.stringify(form)}</h1>
		</div>
	);
};

export default Seminar;
