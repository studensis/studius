import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Student } from '../typings';

const User = () => {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);

	useEffect(() => {
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	const refreshData = () => {
		Router.replace(Router.asPath);
	};

	const updateStudent = async (e: any) => {
		let avatar_url: string = '/' + e.target.parentElement.children[0].value;

		try {
			fetch(`http://localhost:3000/api/student/${user?.id}`, {
				body: JSON.stringify({
					avatar_url,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}).then(() => {
				refreshData();
			});
		} catch (error) {
			console.log(error);
		}

		sessionStorage.setItem(
			'student',
			JSON.stringify({
				...user,
				avatar_url: avatar_url,
			})
		);
		setUser(JSON.parse(sessionStorage.getItem('student')));
	};

	const deleteStudent = async (e: any) => {
		try {
			fetch(`http://localhost:3000/api/student/${user?.id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'DELETE',
			}).then(() => {
				const res = signOut({
					callbackUrl: '/',
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (status == 'authenticated') {
		return (
			<div className="bg-[#F5F6FA] h-[4000px] w-screen overflow-auto">
				<div className="absolute left-[72px] top-[72px] px-60 p-32 h-[4000px] space-y-4">
					<h1>{user?.name + ' ' + user?.surname}</h1>
					<p>{user?.JMBAG}</p>
					<p>{user?.email}</p>
					<p>{String(user?.id)}</p>
					<p>{user?.username}</p>
					<div>
						<input
							name="avatar_url"
							type="text"
							placeholder={
								user?.avatar_url
									? user?.avatar_url
									: 'Image URL'
							}
						/>
						<button
							className="border-4"
							onClick={(e) => updateStudent(e)}
						>
							Ažuriraj
						</button>
					</div>
					<div>
						<button
							className="border-4"
							onClick={(e) => deleteStudent(e)}
						>
							Izbriši studenta
						</button>
					</div>

					<div className="font-bold">
						<Link href={'/userlist'}>Lista svih usera</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default User;
