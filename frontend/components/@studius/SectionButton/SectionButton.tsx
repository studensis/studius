import Link from 'next/link';
import Icon, { IconName } from '../Icon/Icon';

export default function SectionButton(props: {
	title: string;
	icon: IconName;
	href: string;
	children?: React.ReactNode;
}) {
	return (
		<Link href={props.href}>
			<button
				className={
					'flex justify-center items-center p-6 md:px-10 md:py-12 bg-section text-accent rounded-2xl hover:opacity-80 active:opacity-50 w-full '
				}
			>
				<div className="select-none flex gap-2 w-full">
					<Icon icon={props.icon} className={'bg-accent'} />
					<div className="button-large justify-center items-center gap-1">
						{props.title}
					</div>
				</div>
			</button>
		</Link>
	);
}
