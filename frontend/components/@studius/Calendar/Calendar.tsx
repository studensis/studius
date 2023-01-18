import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { Block } from '../PageElements/Block';
import { SectionTop } from '../PageElements/SectionTop';

type CalendarEvent = {
	id: string;
	title: string;
	timeDateUnix: number;
};

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const Day = ({
	day,
	setSelectedDay,
	numberOfEvents,
	setNextMonth,
	setPreviousMonth,
}: {
	day: {
		day: number;
		isOtherMonth: boolean;
		current: boolean;
		selected: boolean;
		dayInYear: number;
	};
	numberOfEvents: number;
	setSelectedDay: (day: number) => void;
	setNextMonth: () => void;
	setPreviousMonth: () => void;
}) => {
	return (
		<>
			<div
				onClick={() => {
					if (setSelectedDay) {
						if (day.dayInYear == -2) setPreviousMonth();
						if (day.dayInYear == -1) setNextMonth();
						if (day.dayInYear >= 0) setSelectedDay(day.dayInYear);
					}
				}}
				className={classNames(
					'cursor-pointer',
					'relative w-8 h-8 rounded-xl cursor-default',
					'hover:bg-accent-weak',
					day.selected && 'bg-accent text-special-white hover:bg-accent',
					day.current && 'text-accent border border-accent-strong',
					day.isOtherMonth && 'text-neutral-medium'
				)}
			>
				<div className="caption !leading-[32px]">{day.day}</div>
				<div className="absolute bottom-0 h-2 left-0 right-0 text-center gap-[2px] flex justify-center">
					{[...new Array(numberOfEvents)].map((i) => (
						<div
							key={i}
							className="w-1 h-1 bg-accent rounded-full inline-block"
						></div>
					))}
				</div>
			</div>
		</>
	);
};

const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;

const getDayInYear = (date: Date) => {
	let endDate =
		Math.floor(date.getTime() / DAY_IN_MILISECONDS) * DAY_IN_MILISECONDS;
	let startOfYear =
		Math.floor(
			new Date(date.getFullYear(), 0, 0).getTime() / DAY_IN_MILISECONDS
		) * DAY_IN_MILISECONDS;
	return Math.floor((endDate - startOfYear) / DAY_IN_MILISECONDS) - 1;
};

const filterEventsByDay = (events: CalendarEvent[], day: number) => {
	return [
		...events.filter((event: CalendarEvent) => {
			let dayOfEvent = Math.floor(
				new Date(event.timeDateUnix).getTime() / DAY_IN_MILISECONDS
			);
			let dayOfFilter = Math.floor(
				new Date(day).getTime() / DAY_IN_MILISECONDS
			);
			return dayOfEvent == dayOfFilter;
		}),
		{ title: 'test', timeDateUnix: day },
	];
};

export const Calendar = ({ events }: { events: CalendarEvent[] }) => {
	const currentDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24);
	const [selectedDate, setSelectedDate] = useState(currentDate);

	const currentYear = currentDate.getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear); // 2023

	const currentMonth = currentDate.getMonth();
	const [selectedMonth, setSelectedMonth] = useState(currentMonth); // March
	let firstDayOfSelectedMonth = new Date(
		selectedYear,
		selectedMonth,
		0
	).getDay();
	let daysInSelectedMonth = new Date(
		selectedYear,
		selectedMonth + 1,
		0
	).getDate();
	let daysInPreviousMonth = new Date(
		selectedYear - (selectedMonth - 1 < 0 ? 1 : 0),
		selectedMonth % 12,
		0
	).getDate();

	const currentDay = getDayInYear(currentDate);
	const [selectedDay, setSelectedDay] = useState(currentDay); // 80 ~ Mar 28 2023

	const getDay = (index: number) => {
		let day = index - firstDayOfSelectedMonth + 1;
		let isOtherMonth = false;
		let selected = false;
		let current = false;

		let dayInYear = -0.5;
		if (day > daysInSelectedMonth) {
			day = -daysInSelectedMonth + day;
			isOtherMonth = true;
			dayInYear = -1;
		} else {
			if (day < 1) {
				day = day + daysInPreviousMonth; // + daysInSelectedMonth;
				isOtherMonth = true;
				dayInYear = -2;
			}
		}

		if (!isOtherMonth) {
			dayInYear = getDayInYear(new Date(selectedYear, selectedMonth, day));
			selected = dayInYear == selectedDay;
			current = dayInYear == currentDay;
		}

		let timeStamp = new Date(selectedYear, dayInYear);

		return { day, isOtherMonth, current, selected, dayInYear, timeStamp };
	};

	const [eventsOnSelectedDay, setEventsOnSelectedDay] = useState<
		CalendarEvent[]
	>([]);

	useEffect(() => {
		// console.clear();
		// console.log(selectedYear, selectedMonth, selectedDay);
		// console.log(selectedDate);
		// console.log('-------');

		// console.log(events);

		let dayOfFilter =
			Math.floor(selectedDate.getTime() / DAY_IN_MILISECONDS) *
			DAY_IN_MILISECONDS;
		// console.log(
		// 	'----------------------------------------------------------------'
		// );

		setEventsOnSelectedDay(
			events
				.sort((a, b) => a.timeDateUnix - b.timeDateUnix)
				.filter((event: CalendarEvent) => {
					let dayOfEvent =
						Math.floor(
							new Date(event.timeDateUnix).getTime() / DAY_IN_MILISECONDS
						) * DAY_IN_MILISECONDS;
					// console.log(dayOfEvent, dayOfFilter);

					return dayOfEvent - DAY_IN_MILISECONDS == dayOfFilter;
				})
		);
	}, [selectedDate]);

	useEffect(() => {
		// console.log(selectedYear, selectedMonth, selectedDay);
		// console.log(new Date(selectedYear, selectedMonth + 1, selectedDay));
		setSelectedDate(new Date(selectedYear, 0, selectedDay + 1));
	}, [selectedYear, selectedMonth, selectedDay]);

	return (
		<>
			<Block>
				<div className="flex justify-between items-center mb-2">
					<span className="title1">
						{
							[
								'Jan',
								'Feb',
								'Mar',
								'Apr',
								'May',
								'Jun',
								'Jul',
								'Aug',
								'Sep',
								'Oct',
								'Nov',
								'Dec',
							][selectedMonth]
						}{' '}
						{selectedYear}
					</span>
					<div>
						<Button
							leftIcon={'chevronLeft'}
							outline
							onClick={() => {
								let nextMonth = selectedMonth - 1;
								if (nextMonth == -1) nextMonth = 11;
								setSelectedMonth(nextMonth);
								if (nextMonth == 11) {
									setSelectedYear(selectedYear - 1);
								}
							}}
						/>
						<Button
							leftIcon={'chevronRight'}
							outline
							onClick={() => {
								let nextMonth = selectedMonth + 1;
								if (nextMonth == 12) nextMonth = 0;
								setSelectedMonth(nextMonth);
								if (nextMonth == 0) {
									setSelectedYear(selectedYear + 1);
								}
							}}
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					{[...new Array(6)].map((week, w) => {
						return (
							<div className="flex w-full justify-between" key={w}>
								{[...new Array(7)].map((day, d) => (
									<div className="flex-1 text-center" key={d}>
										<Day
											day={getDay(w * 7 + d)}
											setSelectedDay={setSelectedDay}
											setNextMonth={() => {
												let nextMonth = selectedMonth + 1;
												if (nextMonth == 12) nextMonth = 0;
												setSelectedMonth(nextMonth);
												if (nextMonth == 0) {
													setSelectedYear(selectedYear + 1);
												}
											}}
											setPreviousMonth={() => {
												let nextMonth = selectedMonth - 1;
												if (nextMonth == -1) nextMonth = 11;
												setSelectedMonth(nextMonth);
												if (nextMonth == 11) {
													setSelectedYear(selectedYear - 1);
												}
											}}
											numberOfEvents={
												events
													.sort((a, b) => a.timeDateUnix - b.timeDateUnix)
													.filter((event: CalendarEvent) => {
														let dayOfFilter =
															Math.floor(
																getDay(w * 7 + d).timeStamp.getTime() /
																	DAY_IN_MILISECONDS
															) * DAY_IN_MILISECONDS;
														let dayOfEvent =
															Math.floor(
																new Date(event.timeDateUnix).getTime() /
																	DAY_IN_MILISECONDS
															) * DAY_IN_MILISECONDS;
														// console.log(dayOfEvent, dayOfFilter);

														return (
															dayOfEvent - DAY_IN_MILISECONDS == dayOfFilter
														);
													}).length
											}
										/>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</Block>
			{eventsOnSelectedDay && (
				<div className="mt-4">
					<SectionTop>
						<p className="title3">
							{
								[
									'Monday',
									'Tuesday',
									'Wednesday',
									'Thursday',
									'Friday',
									'Saturday',
									'Sunday',
								][selectedDate.getDay()]
							}{' '}
							{selectedDate.toLocaleDateString('hr')}
						</p>
					</SectionTop>
				</div>
			)}
			{eventsOnSelectedDay.map((event, i) => (
				<Link key={i} href={`/event/${event.id}`}>
					<Block className="hover:opacity-60">
						<p className="title3">{event.title}</p>
						<p className="body3 text-neutral-strong">
							{new Date(event.timeDateUnix).toString()}
						</p>
					</Block>
				</Link>
			))}
		</>
	);
};
