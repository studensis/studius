import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import Icon from '../Icon/Icon';

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

function sliceIntoChunks(arr: any, chunkSize: number) {
	const res = [];
	for (let i = 0; i < arr.length; i += chunkSize) {
		const chunk = arr.slice(i, i + chunkSize);
		res.push(chunk);
	}
	return res;
}

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

	const [objectsPage, setObjectsPage] = useState(objects);
	const [objectsPerPage, setObjectsPerPage] = useState<number>(10);
	const [index, setIndex] = useState<number>(0);
	const [filter, setFilter] = useState<String>('');

	useEffect(() => {
		setObjectsPage(
			sliceIntoChunks(
				objects.filter((object) => {
					return (
						object.firstname
							.toLowerCase()
							.includes(filter.toLocaleLowerCase()) ||
						object.lastname.toLowerCase().includes(filter.toLocaleLowerCase())
					);
				}),
				objectsPerPage
			)[index]
		);
	}, [objectsPerPage, index, filter]);

	return (
		<>
			<div className="w-full rounded-xl border border-accent-medium shadow-xl overflow-hidden border-collapse overflow-x-scroll">
				<div className="p-4 flex justify-between items-center">
					<div className="flex justify-center items-center">
						<h1 className="body3">Elements per page:</h1>
						<input
							className="p-2 m-2 overflow-hidden rounded-lg border-2 outline-none border-accent-weak focus:border-accent-medium "
							onChange={(e) => {
								setObjectsPerPage(Number(e.target.value));
							}}
							name="elements"
							type="number"
							placeholder="10"
							min={10}
						/>
					</div>
					<div className="flex justify-center items-center">
						<h1 className="body3">Filter by keyword</h1>
						<input
							onChange={(e) => setFilter(e.target.value)}
							className="p-2 m-2 overflow-hidden rounded-lg border-2 outline-none border-accent-weak focus:border-accent-medium "
							name="filter"
							type="text"
							placeholder="Filter"
						/>
					</div>
					<div className="p-4 flex items-center justify-center">
						<Button onClick={() => (index > 0 ? setIndex(index - 1) : <></>)}>
							<Icon icon="chevronLeft" className="bg-white" />
						</Button>
						<h1 className="px-4 p-2 m-4 rounded-xl border-2 border-accent-medium">
							{index + 1}
						</h1>
						<Button
							onClick={() =>
								index + 1 < objects.length / objectsPerPage ? (
									setIndex(index + 1)
								) : (
									<></>
								)
							}
						>
							<Icon icon="chevronRight" className="bg-white" />
						</Button>
					</div>
				</div>

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
						{objectsPage &&
							objectsPage
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
