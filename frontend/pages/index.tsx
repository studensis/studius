import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import Main from '../components/Main';
import { prisma } from '../lib/prisma';
import { Student } from '../typings';

export default function Home(props: any) {
	const { status, data } = useSession();
	const [user, setUser] = useState<Student | undefined>(undefined);

	const router = useRouter();

	// UZIMANJE IZ SESSION NAME-A

	// useEffect(() => {
	//   if (data) {
	//     setUser(JSON.parse(data.user.name));
	//     //console.log(JSON.parse(data.user.name).avatar_url);
	//   }
	// }, [data]);

	useEffect(() => {
		if (
			sessionStorage.getItem('user') === 'null' ||
			sessionStorage.getItem('user') === null ||
			sessionStorage.getItem('user') === undefined ||
			sessionStorage.getItem('user') === 'undefined'
		) {
			sessionStorage.setItem('user', JSON.stringify(props.user));
		}
		setUser(JSON.parse(sessionStorage.getItem('user')));
	}, []);

	useEffect(() => {
		// brise param email iz url-a
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.has('email')) {
			queryParams.delete('email');
			router.replace({
				search: queryParams.toString(),
			});
		}
	}, [props]);

	if (status === 'loading') {
		return (
			<div className="overflow-x-hidden h-screen w-screen">
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="display2">Loading</h1>
				</div>
			</div>
		);
	} else if (status === 'unauthenticated') {
		return (
			<div>
				<div className="flex justify-center items-center flex-col h-screen ">
					<h1 className="display2">Home page</h1>
					<br />
					<Button>
						<Link href="/auth/login">
							<p className="title1">Login</p>
						</Link>
					</Button>
				</div>
			</div>
		);
	} else if (status === 'authenticated') {
		return (
			<div className="overflow-x-hidden">
				<div>
					<Main />
				</div>
			</div>
		);
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { email } = context.query;

	var user: Student = await prisma.user.findFirst({
		where: { email: String(email) },
	});

	return {
		props: {
			user,
		},
	};
};
