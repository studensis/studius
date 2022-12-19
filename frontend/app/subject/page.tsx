import SubjectList from './SubjectList';

async function Page() {
	return (
		<>
			<h1>Subject Page</h1>
			<p>test</p>
			{/* @ts-ignore */}
			<SubjectList />
		</>
	);
}

export default Page;
