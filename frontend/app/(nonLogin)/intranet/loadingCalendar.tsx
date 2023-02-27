export default function LoadingCalendar() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className=" min-w-full flex flex-col md:px-10 sm:px-6 py-10 bg-section rounded-xl overflow-x-auto">
			<div className="flex justify-between mb-2 min-h-[40px]">
				<div className="rounded-md min-w-[100px] flex-col animated-background"></div>
				<div className="flex gap-0">
					<div className="flex-col mr-1 min-w-[50px] rounded-xl animated-background"></div>
					<div className="flex-col min-w-[50px] rounded-xl animated-background"></div>
				</div>
			</div>
			<div>
				<div className="flex flex-row w-full justify-between ">
					{[...new Array(7)].map(() => (
						<div className="flex flex-col">
							{[...new Array(6)].map(() => (
								<div className="flex flex-1 animated-background text-center min-w-[32px] min-h-[32px] rounded-xl mr-[13.72px] mb-[8px] "></div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
