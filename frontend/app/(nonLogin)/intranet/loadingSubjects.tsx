export default function LoadingSubjects() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="grid w-full gap-2 md:grid-cols-2 grid-cols-1 mt-2">
			{[...new Array(4)].map(() => (
				<div className="flex flex-col bg-section p-10 rounded-3xl h-full">
					<div className="rounded-md w-[100px] flex-col animated-background max-h-[24px]"></div>
					<div className="rounded-md w-[162px] flex-col animated-background max-h-[22px] my-[3px]"></div>
					<div className="rounded-md w-[55px] flex-col animated-background max-h-[16px] my-[3px] ml-[4px]"></div>
				</div>
			))}
		</div>
	);
}
