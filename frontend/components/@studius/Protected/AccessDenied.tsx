import Link from 'next/link';

const AccessDenied = () => {
	return (
		<div className="h-[500px] w-full  flex justify-center items-center">
			<div className="text-center title1 ">
				<h1 className="m-4 p-4">You don't have access to this page</h1>
				<Link
					className="rounded-xl shadow-xl border-2 border-accent-medium p-3 px-6 cursor-pointer "
					href="/"
				>
					Back to Homepage
				</Link>
			</div>
		</div>
	);
};

export default AccessDenied;
