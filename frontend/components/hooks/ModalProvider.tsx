'use client';

import React, {
	createContext,
	FC,
	MouseEventHandler,
	useContext,
	useState,
} from 'react';
import Icon, { IconName } from '../@studius/Icon/Icon';

const Tag: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<>
			<div className="px-2 py-1 rounded-lg bg-info-weak inline-block">
				<p className="text-info caption">{children}</p>
			</div>
		</>
	);
};

export const ListItems = {
	Profile: () => {
		return (
			<>
				<div className="p-6 flex gap-4">
					<div className="w-12 h-12 rounded-2xl bg-neutral"></div>
					<div className="flex flex-col">
						<p className="title1 text-neutral">Ime Prezime</p>
						<div className="w-full">
							<Tag>Student</Tag>
						</div>
					</div>
				</div>
			</>
		);
	},
	Action: ({
		text,
		onClick,
		icon,
	}: {
		text: string;
		onClick: MouseEventHandler<HTMLDivElement>;
		icon: IconName;
	}) => {
		return (
			<>
				<div
					className="px-6 py-4 rounded-lg flex gap-4 hover:bg-accent-weak cursor-pointer"
					onClick={onClick}
				>
					<div className="flex flex-row gap-2">
						<span>
							<Icon icon={icon} className="bg-accent" />
						</span>
						<p className="button-large text-accent">{text}</p>
					</div>
				</div>
			</>
		);
	},
};

interface IModalContext {
	sidebarElement: React.ReactNode | null;
	setSidebar: (element: React.ReactNode | null) => void;
}

const ModalContext = createContext<IModalContext>({
	sidebarElement: null,
	setSidebar: (element) => {},
});

function ModalProvider({ children }: { children: React.ReactNode }) {
	const [sidebarElement, setSidebarElement] =
		useState<React.ReactNode | null>(
			<>
				<ListItems.Profile />
				<ListItems.Action
					text="View Profile"
					icon="user"
					onClick={() => {}}
				/>
				<ListItems.Action
					text="Log Out"
					icon="logOut"
					onClick={() => {}}
				/>
				<ListItems.Action
					text="Settings"
					icon="settings"
					onClick={() => {}}
				/>
			</>
		);

	return (
		<>
			<ModalContext.Provider
				value={{
					sidebarElement: sidebarElement,
					setSidebar: (element) => {
						if (element) {
							setSidebarElement(element);
						} else {
							setSidebarElement(null);
						}
					},
				}}
			>
				{children}
			</ModalContext.Provider>
		</>
	);
}

export function ModalSidebar() {
	const { sidebarElement, setSidebar } = useModal();
	return (
		<>
			{sidebarElement ? (
				<div className="absolute right-0 top-24 bottom-0 p-6 box-content w-[360px]">
					<div className="shadow-lg-left w-full relative max-h-full overflow-x-hidden overlow-y-scroll rounded-2xl bg-section pb-6">
						<div
							className="absolute top-4 right-4 p-2 hover:bg-neutral-weak rounded-xl cursor-pointer"
							onClick={() => {
								setSidebar(null);
							}}
						>
							<Icon icon="close" className="bg-neutral" />
						</div>
						{sidebarElement}
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}

const useModal = () => useContext(ModalContext);
export default useModal;

export { ModalProvider };
