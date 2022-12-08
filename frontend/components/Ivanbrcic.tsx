/* eslint-disable jsx-a11y/alt-text */

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './Button';
import Icon from './Icon';
import Subject from './Subject';

const Ivanbrcic = () => {
	const [darkMode, setDarkmode] = useState(false);
	const [sided, setSided] = useState(true);
	const [name, setName] = useState('');

	return (
		<div>
			<header className="w-screen h-[60px] dark:from-dark-accent-medium dark:to-dark-accent-weak bg-gradient-to-l to-light-accent-medium from-light-accent-strong flex justify-between shadow-xl">
				<Link href="/">
					<div className="h-full w-max flex justify-start items-center p-3 cursor-pointer">
						<Image
							className=""
							src="/./assets/ferLogo.png"
							width={80}
							height={50}
						/>
					</div>
				</Link>

				<div className="flex items-center p-5">
					<Link
						href="/login"
						className="flex text-lg text-black dark:text-dark-accent p-3">
						Login
					</Link>
					<div
						className="cursor-pointer"
						onClick={() => setDarkmode(!darkMode)}>
						<Icon className="pt-2" icon={'logOut'} size={30} />
					</div>
				</div>
			</header>

			<div className="w-screen flex justify-center dark:from-dark-accent-strong dark:to-dark-neutral-weak bg-gradient-to-tl from-light-neutral-medium to-light-accent-weak dark:bg-dark-neutral-medium">
				<div className="w-[80%] h-full my-8">
					<h1 className="text-5xl dark:text-gray-400 text-light-accent p-4 flex justify-start shad">
						Pozdrav, Ivane! Izuzetno si zgodan danas!
					</h1>

					<div className={!sided ? 'pt-6' : 'pt-6 flex'}>
						<div>
							<div className="p-3 flex" onClick={() => setSided(!sided)}>
								<Button leftIcon="logOut" />
								<h1
									className={
										!sided
											? 'text-center title1 p-3 text-light-accent-strong'
											: 'title1 p-3 text-light-accent-strong dark:text-gray-400 transition-shadow'
									}>
									Predmeti:
								</h1>
							</div>

							<div
								className={
									!sided ? 'flex justify-center' : 'flex justify-start'
								}>
								<div
									className={
										!sided
											? 'justify-center grid lg:grid-cols-3 grid-cols-1 gap-10 pt-'
											: 'justify-start grid lg:grid-cols-1 grid-cols-1 gap-1 '
									}>
									<div
										className={
											!sided ? 'p-2 pb-10 ' : 'p-2 py-0 cursor-pointer '
										}>
										<Subject
											className=""
											background="/./assets/digitalna.jpg"
											title="Digitalna Logika"
											href="/digitalnalogika"
											sided={sided}
										/>
									</div>
									<div className={!sided ? 'p-2 pb-10 ' : 'p-2 py-0 '}>
										<Subject
											className=""
											background="/./assets/linearna.jpg"
											title="Linearna Algebra"
											href="/digitalnalogika"
											sided={sided}
										/>
									</div>
									<div className={!sided ? 'p-2 pb-10 ' : 'p-2 py-0 '}>
										<Subject
											className=""
											background="/./assets/matan1.jpg"
											title="Matematicka Analiza 1"
											href="/digitalnalogika"
											sided={sided}
										/>
									</div>
									<div className={!sided ? 'p-2 pb-10 ' : 'p-2 py-0 '}>
										<Subject
											className=""
											background="/./assets/upro.jpg"
											title="Uvod u Programiranje"
											href="/digitalnalogika"
											sided={sided}
										/>
									</div>
									<div className={!sided ? 'p-2 pb-10 ' : 'p-2 py-0 '}>
										<Subject
											className=""
											background="/./assets/vjekom.jpeg"
											title="Vjestine Komuniciranja"
											href="/digitalnalogika"
											sided={sided}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ivanbrcic;
