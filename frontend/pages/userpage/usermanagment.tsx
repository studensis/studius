import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import UserManagment from '../../components/UserManagment';
import { Student } from '../../typings';

const Usermanagment = ({ students }) => {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);
	const [a, seta] = useState(false);

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);
	if (status == 'authenticated') {
		if (data.user.email === 'STUDENT') {
			return (
				<div className="overflow-x-hidden">
					<div className="display2 w-screen h-screen items-center flex justify-center ">
						<h1 className="w-[70%]">Ne moze!</h1>
					</div>
				</div>
			);
		} else if (data.user.email === 'PROFESSOR') {
			return (
				<div className="">
					<div className="">
						<UserManagment students={students} />
					</div>
				</div>
			);
		}
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

export default Usermanagment;

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
