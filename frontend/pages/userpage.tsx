import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import UserPageProfessor from '../components/UserPageProfessor';
import UserPageStudent from '../components/UserPageStudent';
import { prisma } from '../lib/prisma';
import { Student } from '../typings';

const Userpage = ({ students }) => {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);
	const router = useRouter();

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
		router.replace(router.asPath);
	}, []);

	if (status == 'authenticated') {
		return (
			<div>
				{data.user.email === 'STUDENT' ? (
					<UserPageStudent />
				) : (
					<UserPageProfessor students={students} />
				)}
				<div></div>
			</div>
		);
	} else if (status === 'loading') {
		<div className="display1">Loading</div>;
	} else {
		return (
			<div className="flex justify-center items-center flex-col h-screen ">
				<h1 className="display2">Nisi ulogiran</h1>
				<Button>
					<Link href="/auth/login">
						<p className="title1">Login</p>
					</Link>
				</Button>
			</div>
		);
	}
};

export default Userpage;

export const getServerSideProps: GetServerSideProps = async () => {
	const students = await prisma.user.findMany({
		where: {
			role: 'STUDENT'
		},
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
