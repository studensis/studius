/* eslint-disable @next/next/no-sync-scripts */
import React, { useState, useEffect, FormEventHandler } from 'react';
import Home from '../index';
import { useRouter } from 'next/router';
import supabase from '../../utils/supabase';
import Head from 'next/head';
import Link from 'next/link';
import { Button } from '../../components/Button';
import { signIn } from 'next-auth/react';
import Icon from '../../components/Icon';

function Login() {
	const [username, setUsername] = useState<string>('');
	const router = useRouter();
	const [route, setRoute] = useState();
	const [errorOccured, setErrorOccured] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string>(
		'Dogodila se greška, pokušajte kasnije.'
	);

	useEffect(() => {}, []);

	//NEXT AUTH BACKEND
	const [userInfo, setUserInfo] = useState({ email: '', password: '' });

	const handleSubmit2: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const res = await signIn('credentials', {
			email: userInfo.email,
			password: userInfo.password,
			callbackUrl: `/?email=${userInfo.email}`,
			//            ^^^^^^^^^^^^^^^^^^^^^^^^^    inace samo "/"
		});
	};
	//NEXT AUTH BACKEND

	return (
		<>
			<Head>
				<title>Login</title>
				<link rel="icon" href="/favicon.ico" />
				<script
					src="https://kit.fontawesome.com/19719150ac.js"
					crossOrigin="anonymous"
				></script>
			</Head>
			<div>
				<div className="bg-light-neutral-weak h-full w-[53%] absolute right-[47%] ">
					<div className="flex justify-center items-center h-full">
						<div>
							<h1 className="display2 mb-7">Log in</h1>
							<p className="body1 mb-3 ">Get accesss to xyz</p>
							<p className="body1 mb-3 ">Eat some pizza</p>
							<p className="body1 mb-3 ">Listen to music</p>
							<p className="body1 mb-3 ">Eat some pizza</p>
							<p className="body1 mb-3 ">Listen to music</p>
						</div>
					</div>
				</div>

				<div className="bg-white h-full w-[47%] absolute left-[53%] ">
					<div className="flex items-center h-full">
						<div className="flex flex-col justify-start items-center">
							<form
								onSubmit={handleSubmit2}
								className="flex flex-col justify-start items-center"
							>
								{errorOccured ? (
									<p className="w-[480px] flex justify-center border-light-danger title2 border-2 rounded-2xl mb-4 mt-4 p-3 bg-light-danger-weak transition-all ease-in ">
										Bruh nekaj je krivo
									</p>
								) : (
									<p className="w-[480px] flex justify-center border-light-danger title2 border-2 rounded-2xl mb-4 mt-4 p-3 bg-light-danger-weak transition-all ease-in opacity-0">
										.
									</p>
								)}
								<div className="flex flex-col m-2 relative">
									<label
										htmlFor="email"
										className="absolute caption top-[-0.4rem] left-3 w-10 text-center bg-white  "
									>
										Email
									</label>
									<input
										name="korisnicko"
										type="text"
										id="email"
										value={userInfo.email}
										onChange={(e) => {
											setUserInfo({
												...userInfo,
												email: (
													e.target as HTMLInputElement
												).value,
											});
										}}
										className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
									/>
								</div>
								<div className="flex flex-col m-5 relative">
									<label
										htmlFor="email"
										className="absolute caption top-[-0.4rem] left-3 w-16 text-center bg-white "
									>
										Password
									</label>
									<input
										name="password"
										type="password"
										id="password"
										value={userInfo.password}
										onChange={(e) => {
											setUserInfo({
												...userInfo,
												password: (
													e.target as HTMLInputElement
												).value,
											});
										}}
										className="border-2 border-light-accent-weak rounded-xl lg:w-[480px] sm:w-[250px] hover:border-light-accent-medium focus:border-light-accent-medium transition-all ease-in outline-none px-3 py-4 "
									/>
									<Link href="/forgotpassword">
										<p className="caption m-2 cursor-pointer text-light-accent-strong">
											Forgot password?
										</p>
									</Link>
								</div>

								<Button
									outline={false}
									style={{ padding: '16px', width: '480px' }}
								>
									<button type="submit">
										Log in with email
									</button>
								</Button>
								<br />
							</form>
							<Button
								outline={false}
								style={{ padding: '16px', width: '480px' }}
								onClick={() => signIn('google')}
							>
								Log in with Google
							</Button>
							{/* <Link passHref href="/register">
                <a href="">
                  <Button
                    outline={true}
                    style={{ padding: "16px", width: "480px" }}
                  >
                    Create Account
                  </Button>
                </a>
              </Link>
              <Button
                outline={true}
                style={{ padding: "16px", width: "480px" }}
              >
                Sign up with AAI@Edu
              </Button>
              <Button
                outline={true}
                style={{ padding: "16px", width: "480px" }}
              >
                Sign up with Google
              </Button> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
