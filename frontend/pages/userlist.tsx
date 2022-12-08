import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { prisma } from '../lib/prisma';
import { Student } from '../typings';

const Userpage = ({ students }) => {
	const { status, data } = useSession();

	return (
		<div>
			<div className="grid place-items-center border-4">
				<ul>
					{students.map((s: Student) => (
						<li key={String(s.id)} className="border-2 p-3 min-w-[200px]">
							<p>
								<span className="font-bold">ID: </span>
								{String(s.id)}
							</p>
							<p>
								<span className="font-bold">Email: </span>
								{s.email}
							</p>
							<p>
								<span className="font-bold">Puno ime: </span>
								{s.name + ' ' + s.surname}
							</p>
							<p>
								<span className="font-bold">JMBAG: </span>
								{s.JMBAG}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Userpage;

export const getServerSideProps: GetServerSideProps = async () => {
	const students = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			surname: true,
			JMBAG: true
		}
	});

	return {
		props: {
			students: students
		}
	};
};
