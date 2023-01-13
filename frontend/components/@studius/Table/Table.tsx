import classNames from 'classnames';
import React from 'react';

const TableHeader = ({
	children,
	right,
}: {
	children: React.ReactNode;
	right?: boolean;
}) => (
	<th
		className={classNames(
			right ? 'text-right' : 'text-left',
			'flex-1 pt-3 pb-2 body3 capitalize px-3'
		)}
	>
		{children}
	</th>
);

const TableRow = ({
	children,
	header,
}: {
	children: React.ReactNode;
	header?: boolean;
}) => (
	<tr
		className={classNames(
			'px-3 flex border-t border-t-background',
			'hover:bg-background cursor-pointer',
			header ? 'bg-background' : 'bg-section'
		)}
	>
		{children}
	</tr>
);

const TableData = ({
	children,
	right,
	onClick,
}: {
	children: React.ReactNode;
	right?: boolean;
	onClick?: () => void;
}) => (
	<td
		onClick={onClick}
		className={classNames(
			right ? 'text-right' : 'text-left',
			'flex-1 py-4 px-3',
			'body2 text-neutral-strong'
		)}
	>
		{children}
	</td>
);

export const Table = <T extends { [key: string]: any }>({
	objects,
	titles,
	onClick,
	actionRow,
}: {
	objects: T[];
	titles: { [key in keyof T]?: string };
	onClick?: (object: T) => void;
	actionRow?: (object: T) => React.ReactNode;
}) => {
	const titleKeys = Object.keys(titles);

	return (
		<>
			<div className="w-full rounded-xl border border-background overflow-hidden border-collapse overflow-x-scroll">
				<table className="w-full mt-[-1px]">
					<thead>
						<TableRow header>
							{titleKeys.map((title, i) => (
								<TableHeader key={i}> {title} </TableHeader>
							))}
							{actionRow && <TableHeader right> Actions </TableHeader>}
						</TableRow>
					</thead>
					<tbody>
						{objects
							.sort((a, b) => (a[titleKeys[0]] > b[titleKeys[0]] ? 1 : -1))
							.map((object, i) => {
								return (
									<TableRow key={i}>
										{titleKeys.map((title, j) => (
											<TableData
												key={j}
												onClick={() => {
													onClick && onClick(object);
												}}
											>
												{object[title]}
											</TableData>
										))}
										{actionRow && (
											<TableData right> {actionRow(object)} </TableData>
										)}
									</TableRow>
								);
							})}
					</tbody>
				</table>
			</div>
		</>
	);
};
