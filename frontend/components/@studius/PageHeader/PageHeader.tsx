import React from 'react';

export default function PageHeader(props: {
	title: string | React.ReactNode;
	subtitle?: string;
	description?: string;
	actionRow?: React.ReactNode | React.ReactNode[];
}) {
	return (
		<>
			<div className="md:px-20 md:py-20 px-6 py-10 rounded-2xl md:rounded-3xl bg-section flex md:flex-row flex-col">
				<div className="flex-1">
					<p className="title2 text-neutral-strong"> {props.subtitle} </p>
					{props.title && (
						<h1 className="display3 mb-6 text-neutral">{props.title}</h1>
					)}
					{props.description && (
						<p className="body1 text-neutral-strong">{props.description}</p>
					)}
				</div>
				{props.actionRow && (
					<div className="relative">
						<div className={'relative top-auto md:top-0 md:translate-y-full'}>
							{props.actionRow}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
