export default function LoadingPosts() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="grid w-full gap-2 md:grid-cols-3 grid-cols-1 mt-2">
			{[...new Array(4)].map(() => (
				<div className="flex flex-col bg-section p-8 rounded-xl h-full justify-center">
					<div className="rounded-md w-[180px] flex-col animated-background h-[400px]"></div>
					<div className="rounded-md w-[100px] flex-col animated-background max-h-[22px] my-[3px]"></div>
				</div>
			))}
		</div>
	);
}
