import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Block } from '../PageElements/Block';

type CalendarEvent = {
	title: string;
	timeDateUnix: string;
};

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const Day = ({
	day,
	setSelectedDay,
}: {
	day: {
		day: number;
		otherMonth: boolean;
		current: boolean;
		selected: boolean;
		dayInYear: number;
	};
	setSelectedDay?: (day: number) => void;
}) => {
	return (
		<>
			<div
				onClick={() => {
					setSelectedDay &&
						day.dayInYear != -1 &&
						setSelectedDay(day.dayInYear);
				}}
				className={classNames(
					'w-8 h-8 rounded-xl cursor-default',
					'hover:bg-accent-weak',
					day.selected && 'bg-accent text-special-white hover:bg-accent',
					day.current && 'text-accent border border-accent-strong',
					day.otherMonth && 'text-neutral-medium'
				)}
			>
				<div className="caption !leading-[32px]">{day.day}</div>
			</div>
		</>
	);
};

type FormattedDay = {
	otherMonth: boolean;
	dayOfRelativeMonth: number;
	current: boolean;
	selected: boolean;
};

const getDayInYear = (date: Date) => {
	return (
		Math.floor(
			(date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
				1000 /
				60 /
				60 /
				24
		) - 1
	);
};

export const Calendar = ({ events }: { events?: CalendarEvent[] }) => {
	const currentDayOfMonth = 10; //new Date();

	const currentTime = new Date(2023, 2, 28);

	const currentYear = currentTime.getFullYear();
	const [selectedYear, setSelectedYear] = useState(currentYear); // 2023

	const currentMonth = currentTime.getMonth();
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

	const currentDay = getDayInYear(currentTime);
	const [selectedDay, setSelectedDay] = useState(currentDay); // Mar 28 2023

	const getDay = (index: number) => {
		let day = index - firstDayOfSelectedMonth + 1;
		let otherMonth = false;

		if (day < 1) {
			day = day + daysInPreviousMonth + daysInSelectedMonth;
			otherMonth = true;
		}
		if (day > daysInSelectedMonth) {
			day = -daysInSelectedMonth + day;
			otherMonth = true;
		}

		let selected = false;
		let current = false;
		let dayInYear = -1;
		if (!otherMonth) {
			dayInYear = getDayInYear(new Date(selectedYear, selectedMonth, day));
			selected = dayInYear == selectedDay;
			current = dayInYear == currentDay;
		}

		return { day, otherMonth, current, selected, dayInYear };
	};

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
										/>
									</div>
								))}
							</div>
						);
					})}
				</div>
			</Block>
		</>
	);
};
