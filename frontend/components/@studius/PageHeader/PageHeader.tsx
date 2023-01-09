export default function PageHeader(props: {
	title: string;
	subtitle?: string;
	description?: string;
}) {
	return (
		<>
			<div className="md:px-20 md:py-20 px-6 py-10 rounded-2xl md:rounded-3xl bg-section">
				<p className="title2 text-neutral-strong"> {props.subtitle} </p>
				{props.title && (
					<h1 className="display3 mb-6 text-neutral">{props.title}</h1>
				)}
				{props.description && (
					<p className="body1 text-neutral-strong">{props.description}</p>
				)}
			</div>
		</>
	);
}
