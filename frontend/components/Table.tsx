import axios from 'axios';
import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import Icon from './Icon';
import Status from './Status';

const pageSize = 10;

type StatusProps = {
	darkMode?: boolean;
	data?: JSON;
	className?: string;
};

const Table: FC<StatusProps> = ({ darkMode, data, className }) => {
	const [posts, setPosts] = useState<any[]>([]);
	const [paginatedPosts, setPaginatedPosts] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/todos').then((res) => {
			console.log(res.data);
			setPosts(res.data);
			setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
		});
	}, []);

	const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
	if (pageCount === null) return null;
	const pages = _.range(1, pageCount + 1);

	const pagination = (pageNum) => {
		setCurrentPage(pageNum);
		const startIndex = (pageNum - 1) * pageSize;
		const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
		setPaginatedPosts(paginatedPost);
	};

	return (
		<div className={className}>
			<div className={darkMode ? 'dark' : ''}>
				{!paginatedPosts ? (
					'No data found'
				) : (
					<table className="text-sm w-[75vw] h-[30vw] bg-light-neutral-weak rounded-lg dark:bg-white text-left ">
						<thead className="border-b-[1px] border-[#F5F6FA] ">
							<tr className="">
								<th className="px-4 py-2 pr-8">ID</th>
								<th className="px-2 py-2 pr-8">User ID</th>
								<th className="px-2 py-2 pr-8">Title</th>
								<th className="px-2 py-2 pr-8 text-center ">
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{paginatedPosts.map((post, index) => (
								<tr
									className="border-b-[1px] border-[#F5F6FA]"
									key={index}
								>
									<td className="px-4 py-2 pr-8">
										{post.id}
									</td>
									<td className="px-4 py-2 pr-8">
										{post.userId}
									</td>
									<td className="px-4 py-2 pr-8">
										{post.title}
									</td>
									<td className="px-4 py-2 pr-8 flex justify-center items-center">
										<Status
											color={
												post.completed ? 'green' : 'red'
											}
										>
											{post.completed
												? 'Completed'
												: 'Uncompleted'}
										</Status>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
				<nav className="flex justify-end my-2 mb-2">
					<ul className="flex text-sm">
						<li
							onClick={() => pagination(currentPage - 1)}
							className="px-2 mx-[1px]  mt-1 cursor-pointer hover:scale-110 "
						>
							<Icon size={1} icon={'chevronLeft'} />
						</li>
						{pages.map((page, i) => (
							<li
								key={i}
								className={
									page === currentPage
										? 'px-2 mx-[1px] rounded-lg border-2 cursor-pointer bg-black dark:bg-white text-white dark:text-black hover:scale-110'
										: page === currentPage - 1
										? 'px-2 mx-[1px] cursor-pointer text-black dark:text-white  hover:scale-110'
										: page === currentPage + 1
										? 'px-2 mx-[1px] cursor-pointer black dark:text-white hover:scale-110'
										: page === currentPage - 2
										? 'px-2 mx-[1px] cursor-pointer black dark:text-white hover:scale-110'
										: page === currentPage + 2
										? 'px-2 mx-[1px] cursor-pointer black dark:text-white hover:scale-110'
										: 'hidden'
								}
							>
								<p onClick={() => pagination(page)}>{page}</p>
							</li>
						))}

						<li
							onClick={() => pagination(currentPage + 1)}
							className="px-2 mt-1 mx-[1px] cursor-pointer "
						>
							<Icon
								className="hover:scale-110"
								size={1}
								icon={'chevronRight'}
							/>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Table;
