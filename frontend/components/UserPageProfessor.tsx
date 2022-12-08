import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Student } from '../typings';
import { Button } from './Button';

const UserPageProfessor = ({ students }) => {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);
	const [a, seta] = useState(false);

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	return (
		<div className="absolute top-[72px] left-[72px] m-16 ">
			<div>
				<h1></h1>
				<h1 className="display2 text-light-accent-weak mb-5 ">
					Vasa strancica, {user?.name}
				</h1>
				<div className=" my-5">
					<Link passHref href="/auth/register">
						<a href="">
							<Button active={true}>Register</Button>
						</a>
					</Link>
				</div>
				<div className=" my-5">
					<Link passHref href="/userpage/usermanagment">
						<a href="">
							<Button active={true}>User Managment</Button>
						</a>
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-4 my-5">
				<ul>
					{students.map((s: Student) => (
						<li
							key={String(s.id)}
							className={
								a
									? 'w-[400px] rounded-xl shadow-xl p-5 mb-2 ml-8'
									: 'w-[400px] rounded-xl shadow-xl p-5 mb-2'
							}>
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

export default UserPageProfessor;
