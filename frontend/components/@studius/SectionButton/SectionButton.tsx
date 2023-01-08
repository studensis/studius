import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import Icon, { IconName } from '../Icon/Icon';

export default function SectionButton(props: {
	title: string;
	icon: IconName;
	href?: string;
	children?: React.ReactNode;
	disabled?: boolean;
}) {
	const router = useRouter();
	return (
		<div
			onClick={() => {
				if (props.href) {
					router.push(props.href);
				}
			}}
		>
			<button
				className={classNames(
					'flex justify-center items-center p-6 md:px-10 md:py-12 text-accent rounded-2xl hover:opacity-80 active:opacity-50 w-full',
					props.disabled
						? 'bg-background border border-section cursor-not-allowed'
						: 'bg-section'
				)}
				disabled={props.disabled}
			>
				<div className="select-none flex gap-2 w-full">
					<Icon icon={props.icon} className={'bg-accent'} />
					<div className="button-large justify-center items-center gap-1">
						{props.title}
					</div>
				</div>
			</button>
		</div>
	);
}
